import Platform from '#models/platform';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  /**
   * Exclude platforms that currently cannot be emulated. Sort by sales.
   *
   * @see https://en.wikipedia.org/wiki/List_of_best-selling_game_consoles
   */
  async run() {
    await Platform.firstOrCreate({ code: 'ps2' }, { name: 'PlayStation 2', company: 'Sony' });
    await Platform.firstOrCreate({ code: 'nds' }, { name: 'Nintendo DS', company: 'Nintendo' });
    await Platform.firstOrCreate({ code: 'ns' }, { name: 'Nintendo Switch', company: 'Nintendo' });
    await Platform.firstOrCreate(
      { code: 'gb' },
      { name: 'Game Boy/Game Boy Color', company: 'Nintendo' },
    );
    await Platform.firstOrCreate({ code: 'psx' }, { name: 'PlayStation', company: 'Sony' });
    await Platform.firstOrCreate({ code: 'wii' }, { name: 'Wii', company: 'Nintendo' });
    await Platform.firstOrCreate({ code: 'ps3' }, { name: 'PlayStation 3', company: 'Sony' });
    await Platform.firstOrCreate(
      { code: 'gba' },
      { name: 'Game Boy Advance', company: 'Nintendo' },
    );
    await Platform.firstOrCreate(
      { code: 'psp' },
      { name: 'PlayStation Portable', company: 'Sony' },
    );
    await Platform.firstOrCreate({ code: '3ds' }, { name: 'Nintendo 3DS', company: 'Nintendo' });
    await Platform.firstOrCreate(
      { code: 'nes' },
      { name: 'Nintendo Entertainment System', company: 'Nintendo' },
    );
    await Platform.firstOrCreate(
      { code: 'snes' },
      { name: 'Super Nintendo Entertainment System', company: 'Nintendo' },
    );
    await Platform.firstOrCreate({ code: 'n64' }, { name: 'Nintendo 64', company: 'Nintendo' });
    await Platform.firstOrCreate({ code: 'md' }, { name: 'Mega Drive/Genesis', company: 'Sega' });
    await Platform.firstOrCreate({ code: 'atari2600' }, { name: 'Atari 2600', company: 'Atari' });
    await Platform.firstOrCreate({ code: 'ngc' }, { name: 'GameCube', company: 'Nintendo' });
    await Platform.firstOrCreate({ code: 'psv' }, { name: 'PlayStation Vita', company: 'Sony' });
    await Platform.firstOrCreate({ code: 'gg' }, { name: 'Game Gear', company: 'Sega' });
    await Platform.firstOrCreate({ code: 'ms' }, { name: 'Master System', company: 'Sega' });
    await Platform.firstOrCreate({ code: 'pce' }, { name: 'PC Engine', company: 'NEC' });
    await Platform.firstOrCreate({ code: 'ss' }, { name: 'Saturn', company: 'Sega' });
    await Platform.firstOrCreate({ code: 'dc' }, { name: 'Dreamcast', company: 'Sega' });
  }
}
