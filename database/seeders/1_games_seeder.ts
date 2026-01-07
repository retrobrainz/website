import parseName from '#database/utils/parseName';
import Company from '#models/company';
import Franchise from '#models/franchise';
import Game from '#models/game';
import Genre from '#models/genre';
import Image from '#models/image';
import Platform from '#models/platform';
import Region from '#models/region';
import Rom from '#models/rom';
import Title from '#models/title';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { download } from '@guoyunhe/downloader';
import { parse } from '@retrobrainz/dat';
import { existsSync } from 'fs';
import { readFile, rm } from 'fs/promises';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  tagCounts: Record<string, number> = {};

  async run() {
    const platforms = await Platform.all();

    await this.downloadGithubRepo('libretro', 'libretro-database');

    for (const platform of platforms) {
      await platform.load('company');
      console.log(`Importing platform: ${platform.company.name} - ${platform.name}`);
      await this.importPlatform(platform);
    }
  }

  async importPlatform(platform: Platform): Promise<void> {
    await this.downloadImage(platform);

    await this.fetchDat(platform);

    process.env.NODE_ENV === 'production' && (await this.deleteImage(platform));
  }

  async fetchDat(platform: Platform): Promise<void> {
    const gameEntries: any[] = [];

    for (const folder of [
      'metadat/no-intro',
      'metadat/redump',
      'metadat/developer',
      'metadat/esrb',
      'metadat/franchise',
      'metadat/genre',
      'metadat/maxusers',
      'metadat/publisher',
      'metadat/releaseyear',
      'metadat/releasemonth',
      'metadat/serial',
      'metadat/tosec',
    ]) {
      const file = `${folder}/${platform.company.name} - ${platform.name}.dat`;
      const data = await readFile(`${process.cwd()}/tmp/libretro-database-master/${file}`, 'utf-8')
        .then((text) => parse(text))
        .catch(() => {
          console.log(`DAT file not found: ${file}`);
          return [] as any[];
        });

      data.forEach((entry) => {
        if (entry.$class !== 'game' || !entry.$entries?.length) {
          return;
        }
        const { crc, serial } = entry.$entries[0];
        const existing = gameEntries.find(
          (e) =>
            (!crc || e.$entries?.[0]?.crc === crc) &&
            (!serial || e.$entries?.[0]?.serial === serial),
        );
        if (existing) {
          const { name, description, comment, $entries, ...attrs } = entry;
          Object.assign(existing, attrs);
        } else {
          gameEntries.push(entry);
        }
      });
    }

    for (const {
      $class, // unused
      name: romName,
      $entries,
      releaseyear,
      releasemonth,
      releaseday,
      description, // unused
      region, // unused
      serial: gameSerial = null,
      developer,
      publisher,
      franchise,
      genre,
      users, // unused
      comment, // unused
      esrb_rating, // unused
      ...attrs
    } of gameEntries) {
      if (!romName) {
        continue;
      }
      const {
        title: titleName,
        name: gameName,
        disc = null,
        regions,
        languages = null,
        tags,
      } = parseName(romName);

      tags?.forEach((tag) => {
        this.tagCounts[tag] = (this.tagCounts[tag] || 0) + 1;
      });

      const title = await Title.firstOrCreate({ name: titleName });

      const game = await Game.firstOrNew({
        platformId: platform.id,
        titleId: title.id,
        name: gameName,
      });

      if (languages) {
        game.languages = languages;
      }

      game.merge(attrs);

      if (!game.releaseDate && releaseyear && releasemonth) {
        game.releaseDate = DateTime.fromObject({
          year: Number(releaseyear),
          month: Number(releasemonth),
          day: releaseday ? Number(releaseday) : 1,
        });
        console.log(releaseyear, releasemonth, releaseday);
      }

      if (game.$isDirty) {
        if (game.$isNew) {
          console.log(`Create game: ${gameName}`);
        } else {
          console.log(`Update game: ${gameName}`);
          console.log(game.$dirty);
        }
        await game.save();
      }

      await game
        .related('regions')
        .saveMany(
          await Promise.all(
            regions.map((regionName) => Region.firstOrCreate({ name: regionName })),
          ),
          true,
        );

      if (developer && !game.developerId) {
        await game.related('developer').associate(await Company.firstOrCreate({ name: developer }));
      }

      if (publisher && !game.publisherId) {
        await game.related('publisher').associate(await Company.firstOrCreate({ name: publisher }));
      }

      if (franchise && !title.franchiseId) {
        await title
          .related('franchise')
          .associate(await Franchise.firstOrCreate({ name: franchise }));
      }

      if (genre) {
        await title.load('genres');
        if (!title.genres.length) {
          await title
            .related('genres')
            .saveMany(
              await Promise.all(
                genre
                  .split('/')
                  .map((genreName: string) => Genre.firstOrCreate({ name: genreName.trim() })),
              ),
              true,
            );
        }
      }

      const imageRepo = `${platform.company.name} - ${platform.name}`.replaceAll(' ', '_');
      if (imageRepo) {
        await game.load('images');
        // special characters in image names are replaced with underscores
        const imageName = romName.replace(/[&*/:`<>?\\|"]/g, '_');

        const importImage = async (type: string) => {
          if (!game.images.some((img) => img.type === type)) {
            const folder = {
              boxart: 'Named_Boxarts',
              screenshot: 'Named_Snaps',
              titlescreen: 'Named_Titles',
            }[type];
            const imagePath = `${process.cwd()}/tmp/${imageRepo}-master/${folder}/${imageName}.png`;

            if (existsSync(imagePath)) {
              try {
                const image = await Image.fromFs(imagePath, type);
                await game.related('images').save(image);
              } catch (error) {
                console.log(`Failed to import image: ${imagePath}`);
                console.error(error);
              }
            }
          }
        };

        await importImage('boxart');
        await importImage('screenshot');
        await importImage('titlescreen');
      }

      await Promise.all(
        $entries.map(
          async ({
            $class: $class_,
            name: filename,
            crc,
            serial: romSerial = null,
            ...romData
          }: any) => {
            const rom = await Rom.firstOrNew({
              name: romName,
              filename,
              crc,
              serial: romSerial || gameSerial,
            });
            rom.merge({ gameId: game.id, disc, ...romData });
            if (rom.$isDirty) {
              if (rom.$isNew) {
                console.log(`  Create rom: ${filename}`);
              } else {
                console.log(`  Update rom: ${filename}`);
                console.log(rom.$dirty);
              }
              await rom.save();
            }
          },
        ),
      );
    }
  }

  async downloadGithubRepo(org: string, repo: string): Promise<void> {
    const url = `https://github.com/${org}/${repo}/archive/refs/heads/master.tar.gz`;
    if (existsSync(`${process.cwd()}/tmp/${repo}-master`)) {
      return;
    }
    const tmp = `${process.cwd()}/tmp/`;
    await download(url, tmp, {
      extract: true,
    });
  }

  async downloadImage(platform: Platform): Promise<void> {
    const imageRepo = `${platform.company.name} - ${platform.name}`.replaceAll(' ', '_');
    await this.downloadGithubRepo('libretro-thumbnails', imageRepo);
  }

  async deleteImage(platform: Platform): Promise<void> {
    const imageRepo = `${platform.company.name} - ${platform.name}`.replaceAll(' ', '_');
    const path = `${process.cwd()}/tmp/${imageRepo}-master`;
    if (existsSync(path)) {
      await rm(path, { recursive: true, force: true });
    }
  }
}
