import Game from '#models/game';
import Rom from '#models/rom';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import datfile from 'robloach-datfile';
import xior from 'xior';

export default class extends BaseSeeder {
  async run() {
    // https://en.wikipedia.org/wiki/List_of_best-selling_game_consoles

    // Nintendo DS/DSi
    await this.fetchDatFile('metadat/no-intro/Nintendo - Nintendo DSi.dat', 'nds');
    await this.fetchPatchDatFile('metadat/publisher/Nintendo - Nintendo DS.dat');

    await this.fetchDatFile('metadat/no-intro/Sega - Mega Drive - Genesis.dat', 'md');
  }

  async fetchDatFile(file: string, platform: string): Promise<void> {
    const url = `https://raw.githubusercontent.com/libretro/libretro-database/refs/heads/master/${encodeURIComponent(file)}`;
    const data = await xior
      .get(url, { timeout: 300 * 1000, responseType: 'text' })
      .then((res) => datfile.parse(res.data, { ignoreHeader: true }));

    for (const { name, entries, releaseyear, releasemonth, releaseday, ...attrs } of data) {
      const game = await Game.firstOrNew({
        platform,
        name,
      });
      game.merge(attrs);
      if (game.$isDirty) {
        if (game.$isNew) {
          console.log(`Create game: ${name} (${platform})`);
        } else {
          console.log(`Update game: ${name} (${platform})`);
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

    for (const { entries, ...attrs } of data) {
      const rom = await Rom.findBy('crc', entries[0].crc);
      if (!rom) continue;
      const game = await Game.find(rom.gameId);
      if (!game) continue;
      game.merge(attrs);
      if (game.$isDirty) {
        if (game.$isNew) {
          console.log(`Create game: ${game.name} (${game.platform})`);
        } else {
          console.log(`Update game: ${game.name} (${game.platform})`);
        }
        await game.save();
      }
    }
  }
}
