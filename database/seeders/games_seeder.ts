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

    for (const gameData of data) {
      console.log(gameData);
      const game = await Game.firstOrCreate(
        {
          platform,
          name: gameData.name,
        },
        {
          platform,
          name: gameData.name,
          region: gameData.region || null,
        },
      );
      await Promise.all(
        gameData.entries.map((entry: any) =>
          Rom.firstOrCreate({ md5: entry.md5 }, { ...entry, gameId: game.id }),
        ),
      );
    }
  }
}
