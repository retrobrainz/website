import Game from '#models/game';
import Platform from '#models/platform';
import Rom from '#models/rom';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';
import datfile from 'robloach-datfile';
import xior from 'xior';

export default class extends BaseSeeder {
  async run() {
    // Nintendo DS
    const nds = await Platform.findBy('code', 'nds');
    if (nds) {
      await this.fetchDatFile('metadat/no-intro/Nintendo - Nintendo DS.dat', nds.id);
      await this.fetchDatFile('metadat/no-intro/Nintendo - Nintendo DSi.dat', nds.id);
      // await this.fetchPatchDatFile('metadat/developer/Nintendo - Nintendo DS.dat');
      // await this.fetchPatchDatFile('metadat/publisher/Nintendo - Nintendo DS.dat');
    }

    // Nitendo Game Boy
    const gb = await Platform.findBy('code', 'gb');
    if (gb) {
      await this.fetchDatFile('metadat/no-intro/Nintendo - Game Boy.dat', gb.id);
    }

    // Nitendo Game Boy Color
    const gbc = await Platform.findBy('code', 'gbc');
    if (gbc) {
      await this.fetchDatFile('metadat/no-intro/Nintendo - Game Boy Color.dat', gbc.id);
    }

    // PlayStation
    const psx = await Platform.findBy('code', 'psx');
    if (psx) {
      await this.fetchDatFile('metadat/redump/Sony - PlayStation.dat', psx.id);
    }

    // PlayStation 2
    const ps2 = await Platform.findBy('code', 'ps2');
    if (ps2) {
      await this.fetchDatFile('metadat/redump/Sony - PlayStation 2.dat', ps2.id);
    }

    // PlayStation 3
    const ps3 = await Platform.findBy('code', 'ps3');
    if (ps3) {
      await this.fetchDatFile('metadat/redump/Sony - PlayStation 3.dat', ps3.id);
      await this.fetchDatFile('metadat/no-intro/Sony - PlayStation 3 (PSN).dat', ps3.id);
    }

    // PlayStation Portable
    const psp = await Platform.findBy('code', 'psp');
    if (psp) {
      await this.fetchDatFile('metadat/no-intro/Sony - PlayStation Portable.dat', psp.id);
      await this.fetchDatFile('metadat/no-intro/Sony - PlayStation Portable (PSN).dat', psp.id);
      await this.fetchDatFile('metadat/no-intro/Sony - PlayStation Portable (PSX2PSP).dat', psp.id);
      await this.fetchDatFile('metadat/redump/Sony - PlayStation Portable.dat', psp.id);
    }

    // PlayStation Vita
    const psv = await Platform.findBy('code', 'psv');
    if (psv) {
      await this.fetchDatFile('metadat/no-intro/Sony - PlayStation Vita.dat', psv.id);
      await this.fetchDatFile('metadat/no-intro/Sony - PlayStation Vita (PSN).dat', psv.id);
    }

    // Sega Mega Drive/Genesis
    const md = await Platform.findBy('code', 'md');
    if (md) {
      await this.fetchDatFile('metadat/no-intro/Sega - Mega Drive - Genesis.dat', md.id);
    }
  }

  /**
   * https://wiki.recalbox.com/en/tutorials/games/generalities/tags-used-in-rom-names
   */
  trimName(name: string): string {
    return name.replace(/\s+\[.*?\]$/u, '').trim();
  }

  async fetchDatFile(file: string, platformId: number): Promise<void> {
    const url = `https://raw.githubusercontent.com/libretro/libretro-database/refs/heads/master/${encodeURIComponent(file)}`;
    const data = await xior
      .get(url, { timeout: 300 * 1000, responseType: 'text' })
      .then((res) => datfile.parse(res.data, { ignoreHeader: true }));

    for (const {
      name,
      entries,
      releaseyear,
      releasemonth,
      releaseday,
      description, // unused
      ...attrs
    } of data) {
      const game = await Game.firstOrNew({
        platformId,
        name,
      });

      game.merge(attrs);

      if (releaseyear || releasemonth || releaseday) {
        game.releaseDate ||= DateTime.fromISO('1970-01-01');

        if (releaseyear) {
          game.releaseDate = game.releaseDate.set({ year: Number(releaseyear) });
        }
        if (releasemonth) {
          game.releaseDate = game.releaseDate.set({ month: Number(releasemonth) });
        }
        if (releaseday) {
          game.releaseDate = game.releaseDate.set({ day: Number(releaseday) });
        }
      }

      if (game.$isDirty) {
        if (game.$isNew) {
          console.log(`Create game: ${name}`);
        } else {
          console.log(`Update game: ${name}`);
        }
        await game.save();
      }

      await Promise.all(
        entries.map(async ({ crc, serial = null, ...romData }: any) => {
          const rom = await Rom.firstOrNew({ crc, serial });
          rom.merge({ gameId: game.id, ...romData });
          if (rom.$isDirty) {
            if (rom.$isNew) {
              console.log(`  Create rom: ${romData.name}`);
            } else {
              console.log(`  Update rom: ${romData.name}`);
            }
            await rom.save();
          }
        }),
      );
    }
  }

  async fetchPatchDatFile(file: string): Promise<void> {
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

        if (releaseyear) {
          game.releaseDate = game.releaseDate.set({ year: Number(releaseyear) });
        }
        if (releasemonth) {
          game.releaseDate = game.releaseDate.set({ month: Number(releasemonth) });
        }
        if (releaseday) {
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
