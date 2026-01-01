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
      await this.fetchDatFile('metadat/no-intro/Nintendo - Game Boy Color.dat', gb.id);
    }

    // PlayStation
    const psx = await Platform.findBy('code', 'psx');
    if (psx) {
      await this.fetchDatFile('metadat/redump/Sony - PlayStation.dat', psx.id);
    }

    // Sega Mega Drive/Genesis
    const md = await Platform.findBy('code', 'md');
    if (md) {
      await this.fetchDatFile('metadat/no-intro/Sega - Mega Drive - Genesis.dat', md.id);
    }
  }

  async fetchDatFile(file: string, platformId: number): Promise<void> {
    const url = `https://raw.githubusercontent.com/libretro/libretro-database/refs/heads/master/${encodeURIComponent(file)}`;
    const data = await xior
      .get(url, { timeout: 300 * 1000, responseType: 'text' })
      .then((res) => datfile.parse(res.data, { ignoreHeader: true }));

    for (const { name, entries, releaseyear, releasemonth, releaseday, ...attrs } of data) {
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
        entries.map(async (entry: any) => {
          const rom = await Rom.firstOrNew({ crc: entry.crc });
          rom.merge({ gameId: game.id, ...entry });
          if (rom.$isDirty) {
            if (rom.$isNew) {
              console.log(`  Create rom: ${entry.name} (${entry.md5})`);
            } else {
              console.log(`  Update rom: ${entry.name} (${entry.md5})`);
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
      console.log(attrs);
      console.log(entries);
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
        if (game.$isNew) {
          console.log(`Create game: ${game.name}`);
        } else {
          console.log(`Update game: ${game.name}`);
        }
        await game.save();
      }
    }
  }
}
