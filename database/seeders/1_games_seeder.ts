import parseName from '#database/utils/parseName';
import Game from '#models/game';
import Image from '#models/image';
import Platform from '#models/platform';
import Region from '#models/region';
import Rom from '#models/rom';
import Title from '#models/title';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { download } from '@guoyunhe/downloader';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import { DateTime } from 'luxon';
import datfile from 'robloach-datfile';
import xior from 'xior';

export default class extends BaseSeeder {
  tagCounts: Record<string, number> = {};

  async run() {
    const platforms = await Platform.all();

    for (const platform of platforms) {
      console.log(`Importing platform: ${platform.company} - ${platform.name}`);
      await this.importPlatform(platform);
    }
  }

  async importPlatform(platform: Platform): Promise<void> {
    await this.downloadImage(platform);

    await this.fetchDat(platform, 'metadat/no-intro');
    await this.fetchDat(platform, 'metadat/redump');

    process.env.NODE_ENV === 'production' && (await this.deleteImage(platform));
  }

  async fetchDat(platform: Platform, category: string): Promise<void> {
    const datFile = `${platform.company} - ${platform.name}.dat`;
    const file = `${category}/${datFile}`;
    const imageRepo = `${platform.company} - ${platform.name}`.replaceAll(' ', '_');
    const url = `https://raw.githubusercontent.com/libretro/libretro-database/refs/heads/master/${encodeURIComponent(file)}`;
    const data = await xior
      .get(url, { timeout: 300 * 1000, responseType: 'text' })
      .then((res) => datfile.parse(res.data, { ignoreHeader: true }))
      .catch((e) => {
        if (e.response && e.response.status === 404) {
          console.log(`DAT file not found: ${file}`);
          return [];
        }
        throw e;
      });

    for (const {
      name: romName,
      entries,
      releaseyear,
      releasemonth,
      releaseday,
      description, // unused
      region, // unused
      serial: gameSerial = null, // unused
      ...attrs
    } of data) {
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

      if (!game.releaseDate && releaseyear && releasemonth && releaseday) {
        game.releaseDate = DateTime.fromObject({
          year: Number(releaseyear),
          month: Number(releasemonth),
          day: Number(releaseday),
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

      const regionIds: number[] = await Promise.all(
        regions.map(async (regionName) => {
          const regionObj = await Region.firstOrCreate({ name: regionName });
          return regionObj.id;
        }),
      );

      await game.related('regions').sync(regionIds, true);

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
        entries.map(async ({ name: filename, crc, serial: romSerial = null, ...romData }: any) => {
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
        }),
      );
    }
  }

  async fetchPatchDat(file: string): Promise<void> {
    const url = `https://raw.githubusercontent.com/libretro/libretro-database/refs/heads/master/${encodeURIComponent(file)}`;
    const data = await xior
      .get(url, { timeout: 300 * 1000, responseType: 'text' })
      .then((res) => datfile.parse(res.data, { ignoreHeader: true }));

    for (const { entries, releaseyear, releasemonth, releaseday, ...attrs } of data) {
      const rom = await Rom.findBy('crc', entries[0].crc);
      if (!rom) continue;

      const game = await Game.find(rom.gameId);
      if (!game) continue;

      game.merge(attrs);

      if (releaseyear || releasemonth || releaseday) {
        game.releaseDate ||= DateTime.fromISO('1970-01-01');

        if (releaseyear && game.releaseDate.year !== Number(releaseyear)) {
          game.releaseDate = game.releaseDate.set({ year: Number(releaseyear) });
        }
        if (releasemonth && game.releaseDate.month !== Number(releasemonth)) {
          game.releaseDate = game.releaseDate.set({ month: Number(releasemonth) });
        }
        if (releaseday && game.releaseDate.day !== Number(releaseday)) {
          game.releaseDate = game.releaseDate.set({ day: Number(releaseday) });
        }
      }

      if (game.$isDirty) {
        console.log(`Update game: ${game.name}`);

        await game.save();
      }
    }
  }

  async downloadImage(platform: Platform): Promise<void> {
    const imageRepo = `${platform.company} - ${platform.name}`.replaceAll(' ', '_');
    const url = `https://github.com/libretro-thumbnails/${imageRepo}/archive/refs/heads/master.zip`;

    if (existsSync(`${process.cwd()}/tmp/${imageRepo}-master`)) {
      return;
    }

    const tmp = `${process.cwd()}/tmp/`;
    await download(url, tmp, {
      extract: true,
    });
  }

  async deleteImage(platform: Platform): Promise<void> {
    const imageRepo = `${platform.company} - ${platform.name}`.replaceAll(' ', '_');
    const path = `${process.cwd()}/tmp/${imageRepo}-master`;
    if (existsSync(path)) {
      await rm(path, { recursive: true, force: true });
    }
  }
}
