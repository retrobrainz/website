import Company from '#models/company';
import Platform from '#models/platform';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  /**
   * Exclude platforms that currently cannot be emulated.
   *
   * @see https://en.wikipedia.org/wiki/List_of_best-selling_game_consoles
   */
  async run() {
    // Nintendo consoles
    const nintendo = await Company.firstOrCreate({ name: 'Nintendo' });
    await Promise.all(
      [
        { name: 'Family Computer Disk System', screenWidth: 256, screenHeight: 240 },
        { name: 'Game Boy', screenWidth: 160, screenHeight: 144 },
        { name: 'Game Boy Advance', screenWidth: 240, screenHeight: 160 },
        { name: 'Game Boy Color', screenWidth: 160, screenHeight: 144 },
        { name: 'GameCube', screenWidth: 640, screenHeight: 480 },
        { name: 'Nintendo 3DS', screenWidth: 400, screenHeight: 240 },
        { name: 'Nintendo 64', screenWidth: 320, screenHeight: 240 },
        { name: 'Nintendo DS', screenWidth: 256, screenHeight: 192 },
        { name: 'Nintendo DSi', screenWidth: 256, screenHeight: 192 },
        { name: 'Nintendo Entertainment System', screenWidth: 256, screenHeight: 240 },
        { name: 'Super Nintendo Entertainment System', screenWidth: 256, screenHeight: 224 },
        { name: 'Wii', screenWidth: 640, screenHeight: 480 },
      ].map(({ name, screenWidth, screenHeight }) =>
        Platform.firstOrCreate({ companyId: nintendo.id, name, screenWidth, screenHeight }),
      ),
    );

    // Sony consoles
    const sony = await Company.firstOrCreate({ name: 'Sony' });
    await Promise.all(
      [
        { name: 'PlayStation', screenWidth: 320, screenHeight: 240 },
        { name: 'PlayStation 2', screenWidth: 640, screenHeight: 480 },
        { name: 'PlayStation 3', screenWidth: 1280, screenHeight: 720 },
        { name: 'PlayStation Portable', screenWidth: 480, screenHeight: 272 },
        { name: 'PlayStation Vita', screenWidth: 960, screenHeight: 544 },
      ].map(({ name, screenWidth, screenHeight }) =>
        Platform.firstOrCreate({ companyId: sony.id, name, screenWidth, screenHeight }),
      ),
    );

    // Sega consoles
    const sega = await Company.firstOrCreate({ name: 'Sega' });
    await Promise.all(
      [
        { name: '32X', screenWidth: 320, screenHeight: 240 },
        { name: 'Dreamcast', screenWidth: 640, screenHeight: 480 },
        { name: 'Game Gear', screenWidth: 160, screenHeight: 144 },
        { name: 'Master System - Mark III', screenWidth: 256, screenHeight: 192 },
        { name: 'Mega-CD - Sega CD', screenWidth: 320, screenHeight: 240 },
        { name: 'Mega Drive - Genesis', screenWidth: 320, screenHeight: 240 },
        { name: 'Saturn', screenWidth: 320, screenHeight: 240 },
      ].map(({ name, screenWidth, screenHeight }) =>
        Platform.firstOrCreate({ companyId: sega.id, name, screenWidth, screenHeight }),
      ),
    );
  }
}
