import parseName from '#database/utils/parseName';
import Game from '#models/game';
import Platform from '#models/platform';
import Region from '#models/region';
import Rom from '#models/rom';
import Title from '#models/title';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';
import datfile from 'robloach-datfile';
import xior from 'xior';

export default class extends BaseSeeder {
  tagCounts: Record<string, number> = {};

  async run() {
    // Nintendo DS
    const nds = await Platform.findBy('code', 'nds');
    if (nds) {
      await this.fetchDat('metadat/no-intro/Nintendo - Nintendo DS.dat', nds.id);
      await this.fetchDat('metadat/no-intro/Nintendo - Nintendo DSi.dat', nds.id);
      await this.fetchDat('metadat/no-intro/Nintendo - Nintendo DS (Download Play).dat', nds.id);
      // await this.fetchPatchDat('metadat/developer/Nintendo - Nintendo DS.dat');
      // await this.fetchPatchDat('metadat/publisher/Nintendo - Nintendo DS.dat');
    }

    // Nintendo 3DS
    const _3ds = await Platform.findBy('code', '3ds');
    if (_3ds) {
      await this.fetchDat('metadat/no-intro/Nintendo - Nintendo 3DS.dat', _3ds.id);
      await this.fetchDat('metadat/no-intro/Nintendo - Nintendo 3DS (Digital).dat', _3ds.id);
      await this.fetchDat('metadat/no-intro/Nintendo - New Nintendo 3DS.dat', _3ds.id);
      await this.fetchDat('metadat/no-intro/Nintendo - New Nintendo 3DS (Digital).dat', _3ds.id);
    }

    // Nitendo Game Boy
    const gb = await Platform.findBy('code', 'gb');
    if (gb) {
      await this.fetchDat('metadat/no-intro/Nintendo - Game Boy.dat', gb.id);
    }

    // Nitendo Game Boy Color
    const gbc = await Platform.findBy('code', 'gbc');
    if (gbc) {
      await this.fetchDat('metadat/no-intro/Nintendo - Game Boy Color.dat', gbc.id);
    }

    // Nitendo Game Boy Advance
    const gba = await Platform.findBy('code', 'gba');
    if (gba) {
      await this.fetchDat('metadat/no-intro/Nintendo - Game Boy Advance.dat', gba.id);
    }

    // Nintendo Wii
    const wii = await Platform.findBy('code', 'wii');
    if (wii) {
      await this.fetchDat('metadat/redump/Nintendo - Wii.dat', wii.id);
      await this.fetchDat('metadat/no-intro/Nintendo - Wii (Digital).dat', wii.id);
    }

    // Nintendo Entertainment System
    const nes = await Platform.findBy('code', 'nes');
    if (nes) {
      await this.fetchDat('metadat/no-intro/Nintendo - Nintendo Entertainment System.dat', nes.id);
    }

    // Super Nintendo Entertainment System
    const snes = await Platform.findBy('code', 'snes');
    if (snes) {
      await this.fetchDat(
        'metadat/no-intro/Nintendo - Super Nintendo Entertainment System.dat',
        snes.id,
      );
    }

    // Nintendo 64
    const n64 = await Platform.findBy('code', 'n64');
    if (n64) {
      await this.fetchDat('metadat/no-intro/Nintendo - Nintendo 64.dat', n64.id);
      await this.fetchDat('metadat/no-intro/Nintendo - Nintendo 64DD.dat', n64.id);
    }

    // Nintendo GameCube
    const ngc = await Platform.findBy('code', 'ngc');
    if (ngc) {
      await this.fetchDat('metadat/redump/Nintendo - GameCube.dat', ngc.id);
    }

    // PlayStation
    const psx = await Platform.findBy('code', 'psx');
    if (psx) {
      await this.fetchDat('metadat/redump/Sony - PlayStation.dat', psx.id);
    }

    // PlayStation 2
    const ps2 = await Platform.findBy('code', 'ps2');
    if (ps2) {
      await this.fetchDat('metadat/redump/Sony - PlayStation 2.dat', ps2.id);
    }

    // PlayStation 3
    const ps3 = await Platform.findBy('code', 'ps3');
    if (ps3) {
      await this.fetchDat('metadat/redump/Sony - PlayStation 3.dat', ps3.id);
      await this.fetchDat('metadat/no-intro/Sony - PlayStation 3 (PSN).dat', ps3.id);
    }

    // PlayStation Portable
    const psp = await Platform.findBy('code', 'psp');
    if (psp) {
      await this.fetchDat('metadat/no-intro/Sony - PlayStation Portable.dat', psp.id);
      await this.fetchDat('metadat/no-intro/Sony - PlayStation Portable (PSN).dat', psp.id);
      await this.fetchDat('metadat/no-intro/Sony - PlayStation Portable (PSX2PSP).dat', psp.id);
      await this.fetchDat('metadat/redump/Sony - PlayStation Portable.dat', psp.id);
    }

    // PlayStation Vita
    const psv = await Platform.findBy('code', 'psv');
    if (psv) {
      await this.fetchDat('metadat/no-intro/Sony - PlayStation Vita.dat', psv.id);
      await this.fetchDat('metadat/no-intro/Sony - PlayStation Vita (PSN).dat', psv.id);
    }

    // Sega Mega Drive/Genesis
    const md = await Platform.findBy('code', 'md');
    if (md) {
      await this.fetchDat('metadat/no-intro/Sega - Mega Drive - Genesis.dat', md.id);
    }

    // Sega Game Gear
    const gg = await Platform.findBy('code', 'gg');
    if (gg) {
      await this.fetchDat('metadat/no-intro/Sega - Game Gear.dat', gg.id);
    }

    // Sega Master System
    const ms = await Platform.findBy('code', 'ms');
    if (ms) {
      await this.fetchDat('metadat/no-intro/Sega - Master System - Mark III.dat', ms.id);
    }

    // Sega Saturn
    const ss = await Platform.findBy('code', 'ss');
    if (ss) {
      await this.fetchDat('metadat/redump/Sega - Saturn.dat', ss.id);
    }

    // Sega Dreamcast
    const dc = await Platform.findBy('code', 'dc');
    if (dc) {
      await this.fetchDat('metadat/redump/Sega - Dreamcast.dat', dc.id);
    }

    // Atari 2600
    const atari2600 = await Platform.findBy('code', 'atari2600');
    if (atari2600) {
      await this.fetchDat('metadat/no-intro/Atari - 2600.dat', atari2600.id);
    }

    Object.entries(this.tagCounts)
      .filter(([, count]) => count >= 10)
      .sort((a, b) => b[1] - a[1])
      .forEach(([tag, count]) => {
        console.log(`${tag}: ${count}`);
      });
  }

  async fetchDat(file: string, platformId: number): Promise<void> {
    const url = `https://raw.githubusercontent.com/libretro/libretro-database/refs/heads/master/${encodeURIComponent(file)}`;
    console.log(url);
    const data = await xior
      .get(url, { timeout: 300 * 1000, responseType: 'text' })
      .then((res) => datfile.parse(res.data, { ignoreHeader: true }));

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
      } = parseName(romName, gameSerial);

      tags?.forEach((tag) => {
        this.tagCounts[tag] = (this.tagCounts[tag] || 0) + 1;
      });

      const title = await Title.firstOrCreate({ name: titleName });

      const game = await Game.firstOrNew({
        platformId,
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
}
