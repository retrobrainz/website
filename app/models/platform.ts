/* eslint-disable no-console */
import { deleteGithubRepo, downloadGithubRepo } from '#utils/github';
import { deduplicate, fixSerial } from '#utils/platform';
import { BaseModel, belongsTo, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { parse as parseDat } from '@retrobrainz/dat';
import { parse as parseName } from '@retrobrainz/name';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { DateTime } from 'luxon';
import Company from './company.js';
import Emulator from './emulator.js';
import Franchise from './franchise.js';
import Game from './game.js';
import Genre from './genre.js';
import Image from './image.js';
import Language from './language.js';
import Region from './region.js';
import Rom from './rom.js';
import Title from './title.js';

export default class Platform extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare companyId: number | null;

  @column()
  declare screenWidth: number;

  @column()
  declare screenHeight: number;

  @column()
  declare logoId: number | null;

  @column()
  declare photoId: number | null;

  @column.date()
  declare releaseDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relations

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;

  @belongsTo(() => Image, { foreignKey: 'logoId' })
  declare logo: BelongsTo<typeof Image>;

  @belongsTo(() => Image, { foreignKey: 'photoId' })
  declare photo: BelongsTo<typeof Image>;

  @hasMany(() => Game)
  declare games: HasMany<typeof Game>;

  @manyToMany(() => Emulator, {
    pivotTable: 'platform_emulator',
  })
  declare emulators: ManyToMany<typeof Emulator>;

  // Virtuals

  @computed()
  get gamesCount(): number | null {
    return this.$extras.games_count ?? null;
  }

  // Libretro import

  async importLibretro(): Promise<void> {
    await downloadGithubRepo('libretro', 'libretro-database');

    await this.downloadThumbnails();

    await this.fetchDat();

    process.env.NODE_ENV === 'production' && (await this.deleteThumbnails());
  }

  async fetchDat(): Promise<void> {
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
      const file = `${folder}/${this.company.name} - ${this.name}.dat`;
      const data = await readFile(`${process.cwd()}/tmp/libretro-database-master/${file}`, 'utf-8')
        .then((text) => parseDat(text))
        .catch(() => {
          return [] as any[];
        });

      for (const entry of data) {
        if (entry.$class !== 'game' || !entry.$entries?.length) {
          continue;
        }

        entry.serial = fixSerial(entry.serial);
        entry.$entries[0].serial = fixSerial(entry.$entries[0].serial);
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

    const deduplicatedGameEntries = deduplicate(gameEntries);

    for (const rawGame of deduplicatedGameEntries) {
      await this.importGame(rawGame);
    }
  }

  async importGame(rawGame: any): Promise<void> {
    const {
      name: romName,
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
      .where('platformId', this.id)
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

    const {
      name: gameName,
      title: titleName,
      disc = null,
      regions,
      languages = [],
    } = parseName(romName);

    const game =
      existingGame ||
      (await Game.firstOrCreate({
        platformId: this.id,
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

    if (!game.titleId && titleName) {
      const title = await Title.firstOrCreate({ name: titleName });
      game.titleId = title.id;
      if (franchise) {
        for (const franchiseName of (franchise as string).split('/')) {
          const franchiseModel = await Franchise.firstOrCreate({ name: franchiseName.trim() });
          await title.related('franchises').save(franchiseModel);
        }
      }
      if (genre) {
        for (const genreName of (genre as string).split('/')) {
          const genreModel = await Genre.firstOrCreate({ name: genreName.trim() });
          await title.related('genres').save(genreModel);
        }
      }
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
        await game.related('developers').save(developerModel);
      }
    }

    if (publisher) {
      for (const publisherName of (publisher as string).split('/')) {
        const publisherModel = await Company.firstOrCreate({ name: publisherName.trim() });
        await publisherModel.refresh();
        await game.related('publishers').save(publisherModel);
      }
    }

    await this.importGameImage(game, romName, 'boxartId', 'Named_Boxarts');
    await this.importGameImage(game, romName, 'logoId', 'Named_Logos');
    await this.importGameImage(game, romName, 'screenshotId', 'Named_Snaps');
    await this.importGameImage(game, romName, 'titlescreenId', 'Named_Titles');

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

  async downloadThumbnails(): Promise<void> {
    const repo = `${this.company.name} - ${this.name}`.replaceAll(' ', '_');
    await downloadGithubRepo('libretro-thumbnails', repo);
  }

  async deleteThumbnails(): Promise<void> {
    const repo = `${this.company.name} - ${this.name}`.replaceAll(' ', '_');
    await deleteGithubRepo(repo);
  }

  async importGameImage(
    game: Game,
    romName: string,
    type: 'boxartId' | 'logoId' | 'screenshotId' | 'titlescreenId',
    folder: string,
  ): Promise<void> {
    const repo = `${this.company.name} - ${this.name}`.replaceAll(' ', '_');
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
}
