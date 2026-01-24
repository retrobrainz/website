import Emulator from '#models/emulator';
import Platform from '#models/platform';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  async run() {
    // Define emulators with their metadata
    const emulators = [
      {
        name: 'RetroArch',
        website: 'https://www.retroarch.com',
        state: 'stable',
        releaseDate: DateTime.fromISO('2010-05-23'),
        platforms: [
          'Nintendo Entertainment System',
          'Family Computer Disk System',
          'Game Boy',
          'Super Nintendo Entertainment System',
          'Nintendo 64',
          'Game Boy Color',
          'Game Boy Advance',
          'GameCube',
          'Nintendo DS',
          'Wii',
          'Nintendo DSi',
          'Nintendo 3DS',
          'PlayStation',
          'PlayStation Portable',
          'PlayStation 2',
          'Master System - Mark III',
          'Mega Drive - Genesis',
          'Game Gear',
          'Sega CD - Mega-CD',
          '32X',
          'Saturn',
          'Dreamcast',
        ],
      },
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
        platforms: ['Switch'],
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
      {
        name: 'Cemu',
        website: 'https://cemu.info',
        state: 'stable',
        releaseDate: DateTime.fromISO('2015-10-13'),
        platforms: ['Wii U'],
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
