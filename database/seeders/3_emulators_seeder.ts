import Emulator from '#models/emulator';
import Platform from '#models/platform';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  async run() {
    // Define emulators with their metadata
    const emulators = [
      {
        name: 'PCSX2',
        website: 'https://pcsx2.net',
        state: 'stable',
        releaseDate: DateTime.fromISO('2002-09-22'),
        platforms: ['PlayStation 2'],
      },
      {
        name: 'RPCS3',
        website: 'https://rpcs3.net',
        state: 'stable',
        releaseDate: DateTime.fromISO('2011-05-23'),
        platforms: ['PlayStation 3'],
      },
      {
        name: 'Eden',
        website: null,
        state: 'experimental',
        releaseDate: null,
        platforms: ['PlayStation Vita'],
      },
      {
        name: 'Citra',
        website: null,
        state: 'discontinued',
        releaseDate: DateTime.fromISO('2015-10-04'),
        platforms: ['Nintendo 3DS'],
      },
      {
        name: 'Dolphin',
        website: 'https://dolphin-emu.org',
        state: 'stable',
        releaseDate: DateTime.fromISO('2003-09-22'),
        platforms: ['GameCube', 'Wii'],
      },
    ];

    // Create emulators and link them to platforms
    for (const { name, platforms: platformNames, ...emulatorData } of emulators) {
      const emulator = await Emulator.firstOrCreate({ name }, { name, ...emulatorData });

      if (platformNames.length > 0) {
        const platforms = await Platform.query().whereIn('name', platformNames);
        const platformIds = platforms.map((platform) => platform.id);
        if (platformIds.length > 0) {
          await emulator.related('platforms').sync(platformIds);
        }
      }
    }
  }
}
