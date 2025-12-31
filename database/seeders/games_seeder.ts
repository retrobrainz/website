import Game from '#models/game';
import Rom from '#models/rom';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import datfile from 'robloach-datfile';
import xior from 'xior';

export default class extends BaseSeeder {
  async run() {
    await this.downloadDatFile('metadat/no-intro/Sega - Mega Drive - Genesis.dat', 'md');
  }

  async downloadDatFile(file: string, platform: string): Promise<void> {
    const url = `https://raw.githubusercontent.com/libretro/libretro-database/refs/heads/master/${encodeURIComponent(file)}`;
    const data = await xior
      .get(url, { timeout: 300 * 1000, responseType: 'text' })
      .then((res) => datfile.parse(res.data, { ignoreHeader: true }));

    for (const { name, region, entries } of data) {
      console.log(platform, name);
      const game = await Game.firstOrNew({
        platform,
        name,
      });
      game.merge({ region });
      if (game.isDirty()) {
        await game.save();
      }

      await Promise.all(
        entries.map(async (entry: any) => {
          const rom = await Rom.firstOrNew({ md5: entry.md5 });
          rom.merge({ gameId: game.id, ...entry });
          if (rom.isDirty()) {
            await rom.save();
          }
        }),
      );
    }
  }
}
