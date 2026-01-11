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
import { parse as parseDat } from '@retrobrainz/dat';
import { parse as parseName } from '@retrobrainz/name';
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
    ]) {
      const file = `${folder}/${platform.company.name} - ${platform.name}.dat`;
      const data = await readFile(`${process.cwd()}/tmp/libretro-database-master/${file}`, 'utf-8')
        .then((text) => parseDat(text))
        .catch(() => {
          return [] as any[];
        });

      data.forEach((entry) => {
        if (entry.$class !== 'game' || !entry.$entries?.length) {
          return;
        }
        const { crc, serial } = entry.$entries[0];

        const existings = gameEntries.filter(
          (e) =>
            (!crc || e.$entries?.[0]?.crc === crc) &&
            (!serial || e.$entries?.[0]?.serial === serial),
        );
        if (existings.length > 0) {
          existings.forEach((existing) => {
            // add missing fields to existing entry
            Object.assign(entry, existing);
            Object.assign(existing, entry);
          });
        } else {
          gameEntries.push(entry);
        }
      });
    }

    const deduplicatedGameEntries = this.deduplicate(gameEntries);

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
      esrb_rating,
      ...attrs
    } of deduplicatedGameEntries) {
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

      let title = await Title.firstOrCreate({ name: titleName });
      await title.refresh();
      await title.load('duplicate');
      title = title.duplicate || title;

      const game = await Game.firstOrNew({
        platformId: platform.id,
        titleId: title.id,
        name: gameName,
      });

      await game.refresh();

      if (languages) {
        game.languages = languages;
      }

      game.merge(attrs);

      if (!game.esrbRating && esrb_rating) {
        game.esrbRating = esrb_rating;
      }

      if ((!game.releaseDate || gameName === romName) && releaseyear && releasemonth) {
        game.releaseDate = DateTime.fromObject({
          year: Number(releaseyear),
          month: Number(releasemonth),
          day: releaseday ? Number(releaseday) : 1,
        });
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

      if (developer) {
        for (const developerName of (developer as string).split('/')) {
          const developerModel = await Company.firstOrCreate({ name: developerName.trim() });
          await developerModel.refresh();
          await developerModel.load('duplicate');
          await game.related('developers').save(developerModel.duplicate || developerModel);
        }
      }

      if (publisher) {
        for (const publisherName of (publisher as string).split('/')) {
          const publisherModel = await Company.firstOrCreate({ name: publisherName.trim() });
          await publisherModel.refresh();
          await publisherModel.load('duplicate');
          await game.related('publishers').save(publisherModel.duplicate || publisherModel);
        }
      }

      if (franchise) {
        for (const franchiseName of (franchise as string).split('/')) {
          const franchiseModel = await Franchise.firstOrCreate({ name: franchiseName.trim() });
          await franchiseModel.refresh();
          await franchiseModel.load('duplicate');
          await title.related('franchises').save(franchiseModel.duplicate || franchiseModel);
        }
      }

      if (genre) {
        for (const genreName of (genre as string).split('/')) {
          const genreModel = await Genre.firstOrCreate({ name: genreName.trim() });
          await genreModel.refresh();
          await genreModel.load('duplicate');
          await title.related('genres').save(genreModel.duplicate || genreModel);
        }
      }

      await game.load('images');
      await this.importImage(platform, game, romName, 'boxart', 'Named_Boxarts');
      await this.importImage(platform, game, romName, 'logo', 'Named_Logos');
      await this.importImage(platform, game, romName, 'screenshot', 'Named_Snaps');
      await this.importImage(platform, game, romName, 'titlescreen', 'Named_Titles');

      await Promise.all(
        $entries.map(
          async ({
            $class: $class_,
            name: filename,
            crc = null,
            serial: romSerial = null,
            ...romData
          }: any) => {
            if (!filename || (!crc && !romSerial)) {
              console.log(`  Skipping rom with empty filename in game: ${game.name}`);
              throw new Error('Empty filename');
            }
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
    const repo = `${platform.company.name} - ${platform.name}`.replaceAll(' ', '_');
    await this.downloadGithubRepo('libretro-thumbnails', repo);
  }

  async importImage(
    platform: Platform,
    game: Game,
    romName: string,
    type: string,
    folder: string,
  ): Promise<void> {
    if (!game.images.some((img) => img.type === type)) {
      const repo = `${platform.company.name} - ${platform.name}`.replaceAll(' ', '_');
      // special characters in image names are replaced with underscores
      const filename = `${romName.replace(/[&*/:`<>?\\|"]/g, '_')}.png`;

      const imagePath = `${process.cwd()}/tmp/${repo}-master/${folder}/${filename}`;

      if (existsSync(imagePath)) {
        try {
          const image = await Image.fromFs(imagePath, type);
          await game.related('images').save(image);
        } catch {
          //
        }
      }
    }
  }

  async deleteImage(platform: Platform): Promise<void> {
    const repo = `${platform.company.name} - ${platform.name}`.replaceAll(' ', '_');
    const path = `${process.cwd()}/tmp/${repo}-master`;
    if (existsSync(path)) {
      await rm(path, { recursive: true, force: true });
    }
  }

  deduplicate(games: any[]): any[] {
    const gamesMap: Record<string, any> = {};
    games.forEach((game) => {
      const { crc } = game.$entries[0];
      const serial = game.$entries[0].serial || game.serial;
      const key = `${crc}-${serial}`;
      if (!gamesMap[key]) {
        gamesMap[key] = game;
      } else {
        console.log(`Deduplicating game: ${game.name} (${crc}/${serial})`);
        gamesMap[key].$entries = [...gamesMap[key].$entries, ...game.$entries];
      }
    });
    return Object.values(gamesMap);
  }
}
