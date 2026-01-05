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
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Family Computer Disk System' });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Game Boy' });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Game Boy Advance' });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Game Boy Color' });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'GameCube' });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Nintendo 3DS' });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Nintendo 64' });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Nintendo DS' });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Nintendo DSi' });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Nintendo Entertainment System' });
    await Platform.firstOrCreate({
      company: 'Nintendo',
      name: 'Super Nintendo Entertainment System',
    });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Wii' });
    await Platform.firstOrCreate({ company: 'Nintendo', name: 'Wii U' });

    // Sony consoles
    await Platform.firstOrCreate({ company: 'Sony', name: 'PlayStation' });
    await Platform.firstOrCreate({ company: 'Sony', name: 'PlayStation 2' });
    await Platform.firstOrCreate({ company: 'Sony', name: 'PlayStation 3' });
    await Platform.firstOrCreate({ company: 'Sony', name: 'PlayStation Portable' });
    await Platform.firstOrCreate({ company: 'Sony', name: 'PlayStation Vita' });

    // Sega consoles
    await Platform.firstOrCreate({ company: 'Sega', name: '32X' });
    await Platform.firstOrCreate({ company: 'Sega', name: 'Dreamcast' });
    await Platform.firstOrCreate({ company: 'Sega', name: 'Game Gear' });
    await Platform.firstOrCreate({ company: 'Sega', name: 'Master System Mark III' });
    await Platform.firstOrCreate({ company: 'Sega', name: 'Mega CD - Sega CD' });
    await Platform.firstOrCreate({ company: 'Sega', name: 'Mega Drive - Genesis' });
    await Platform.firstOrCreate({ company: 'Sega', name: 'Saturn' });
  }
}
