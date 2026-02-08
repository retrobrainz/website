/* eslint-disable no-console */
import Company from '#models/company';
import Franchise from '#models/franchise';
import Game from '#models/game';
import Genre from '#models/genre';
import Image from '#models/image';
import Language from '#models/language';
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
  async run() {
    const platforms = await Platform.all();

    await this.downloadGithubRepo('libretro', 'libretro-database');

    for (const platform of platforms) {
      await platform.load('company');
      console.log(`start import: ${platform.name}`);
      await this.importPlatform(platform);
      console.log('done');
    }

    process.env.NODE_ENV === 'production' && (await this.deletedGithubRepo('libretro-database'));
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

      for (const entry of data) {
        if (entry.$class !== 'game' || !entry.$entries?.length) {
          continue;
        }

        entry.serial = this.fixSerial(entry.serial);
        entry.$entries[0].serial = this.fixSerial(entry.$entries[0].serial);
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
      }
    }

    const deduplicatedGameEntries = this.deduplicate(gameEntries);

    for (const rawGame of deduplicatedGameEntries) {
      await this.importGame(rawGame, platform);
    }
  }

  async importGame(rawGame: any, platform: Platform): Promise<void> {
    const {
      name: romName,
      title,
      $entries,
      releaseyear,
      releasemonth,
      releaseday,
      serial: gameSerial = null,
      developer,
      publisher,
      franchise,
      genre,
      esrb_rating,
    } = rawGame;

    if (!romName) {
      return;
    }

    const existingGame = await Game.query()
      .where('platformId', platform.id)
      .whereHas('roms', (q) => {
        for (const { crc, serial } of $entries) {
          q.orWhere((subBuilder) => {
            if (crc) {
              subBuilder.andWhere('crc', crc);
            }
            if (serial) {
              subBuilder.andWhere('serial', serial);
            }
          });
        }
      })
      .first();

    const { name: gameName, disc = null, regions, languages = [] } = parseName(romName);

    const game =
      existingGame ||
      (await Game.firstOrCreate({
        platformId: platform.id,
        name: gameName,
      }));

    await game.refresh();

    if (!game.esrbRating && esrb_rating && esrb_rating !== 'NOT RATED') {
      game.esrbRating = esrb_rating;
    }

    if ((!game.releaseDate || gameName === romName) && releaseyear && releasemonth) {
      game.releaseDate = DateTime.fromObject({
        year: Number(releaseyear),
        month: Number(releasemonth),
        day: releaseday ? Number(releaseday) : 1,
      });
    }

    if (!game.titleId && title) {
      const titleModel = await Title.firstOrCreate({ name: title });
      game.titleId = titleModel.id;
    }

    if (game.$isDirty) {
      await game.save();
    }

    await game
      .related('regions')
      .saveMany(
        await Promise.all(regions.map((regionName) => Region.firstOrCreate({ name: regionName }))),
        true,
      );

    for (const language of languages) {
      try {
        const languageModel = await Language.findByOrFail('code', language.toLocaleLowerCase());
        await game.related('languages').save(languageModel);
      } catch (error) {
        console.log(`Unknown language code: ${language}`);
        throw error;
      }
    }

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

    await game.load('title');
    await game.title?.load('franchises');
    if (franchise && !game.title?.franchises.length) {
      for (const franchiseName of (franchise as string).split('/')) {
        const franchiseModel = await Franchise.firstOrCreate({ name: franchiseName.trim() });
        await franchiseModel.refresh();
        await game.title?.related('franchises').save(franchiseModel);
      }
    }

    if (genre) {
      for (const genreName of (genre as string).split('/')) {
        const genreModel = await Genre.firstOrCreate({ name: genreName.trim() });
        await genreModel.refresh();
        await genreModel.load('duplicate');
        await game.related('genres').save(genreModel.duplicate || genreModel);
      }
    }

    await this.importImage(platform, game, romName, 'boxartId', 'Named_Boxarts');
    await this.importImage(platform, game, romName, 'logoId', 'Named_Logos');
    await this.importImage(platform, game, romName, 'screenshotId', 'Named_Snaps');
    await this.importImage(platform, game, romName, 'titlescreenId', 'Named_Titles');

    await Promise.all(
      $entries.map(
        async ({ name: filename, size, crc, md5, sha1, serial: romSerial = null }: any) => {
          if (!crc) {
            console.log(`ROM without CRC: ${filename}`);
            return;
          }

          const extra = {
            gameId: game.id,
            name: romName,
            filename,
            size,
            md5,
            sha1,
            disc,
          };

          const rom = await Rom.firstOrCreate(
            {
              crc,
              serial: romSerial || gameSerial,
            },
            extra,
          );
          rom.merge(extra);

          if (rom.$isDirty) {
            await rom.save();
          }
        },
      ),
    );
  }

  async downloadGithubRepo(org: string, repo: string): Promise<void> {
    const url = `https://github.com/${org}/${repo}/archive/refs/heads/master.tar.gz`;
    if (existsSync(`${process.cwd()}/tmp/${repo}-master`)) {
      return;
    }
    const tmp = `${process.cwd()}/tmp/`;
    try {
      await download(url, tmp, {
        extract: true,
      });
    } catch {
      console.error(`Failed to download ${url}`);
    }
  }

  async downloadImage(platform: Platform): Promise<void> {
    const repo = `${platform.company.name} - ${platform.name}`.replaceAll(' ', '_');
    await this.downloadGithubRepo('libretro-thumbnails', repo);
  }

  async importImage(
    platform: Platform,
    game: Game,
    romName: string,
    type: 'boxartId' | 'logoId' | 'screenshotId' | 'titlescreenId',
    folder: string,
  ): Promise<void> {
    const repo = `${platform.company.name} - ${platform.name}`.replaceAll(' ', '_');
    // special characters in image names are replaced with underscores
    const filename = `${romName.replace(/[&*/:`<>?\\|"]/g, '_')}.png`;

    const imagePath = `${process.cwd()}/tmp/${repo}-master/${folder}/${filename}`;

    if (!game[type] && existsSync(imagePath)) {
      try {
        const image = await Image.fromFs(imagePath);
        game[type] = image.id;
        await game.save();
      } catch {
        //
      }
    }
  }

  async deletedGithubRepo(repo: string): Promise<void> {
    const path = `${process.cwd()}/tmp/${repo}-master`;
    if (existsSync(path)) {
      await rm(path, { recursive: true, force: true });
    }
  }

  async deleteImage(platform: Platform): Promise<void> {
    const repo = `${platform.company.name} - ${platform.name}`.replaceAll(' ', '_');
    await this.deletedGithubRepo(repo);
  }

  deduplicate(games: any[]): any[] {
    const gamesMap: Record<string, any> = {};
    games.forEach((game) => {
      const { crc } = game.$entries[0];
      const serial = game.$entries[0].serial || game.serial;
      const key = JSON.stringify({ crc, serial });
      if (!gamesMap[key]) {
        gamesMap[key] = game;
      } else {
        console.log(`Deduplicating game: ${game.name} (${crc}/${serial})`);
        gamesMap[key].$entries = [...gamesMap[key].$entries, ...game.$entries];
      }
    });
    return Object.values(gamesMap);
  }

  fixSerial(serial: string): string {
    if (serial === 'SLUS21568') return 'SLUS-21568';
    return serial;
  }
}
