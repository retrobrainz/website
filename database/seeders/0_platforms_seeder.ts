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
        'Family Computer Disk System',
        'Game Boy',
        'Game Boy Advance',
        'Game Boy Color',
        'GameCube',
        'Nintendo 3DS',
        'Nintendo 64',
        'Nintendo DS',
        'Nintendo DSi',
        'Nintendo Entertainment System',
        'Super Nintendo Entertainment System',
        'Wii',
        'Wii U',
      ].map((name) => Platform.firstOrCreate({ companyId: nintendo.id, name })),
    );

    // Sony consoles
    const sony = await Company.firstOrCreate({ name: 'Sony' });
    await Promise.all(
      [
        'PlayStation',
        'PlayStation 2',
        'PlayStation 3',
        'PlayStation Portable',
        'PlayStation Vita',
      ].map((name) => Platform.firstOrCreate({ companyId: sony.id, name })),
    );

    // Sega consoles
    const sega = await Company.firstOrCreate({ name: 'Sega' });
    await Promise.all(
      [
        '32X',
        'Dreamcast',
        'Game Gear',
        'Master System - Mark III',
        'Mega-CD - Sega CD',
        'Mega Drive - Genesis',
        'Saturn',
      ].map((name) => Platform.firstOrCreate({ companyId: sega.id, name })),
    );
  }
}
