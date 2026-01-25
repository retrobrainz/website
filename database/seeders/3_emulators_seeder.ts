import Emulator from '#models/emulator';
import Image from '#models/image';
import OperatingSystem from '#models/operating_system';
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
        icon: 'https://github.com/libretro/RetroArch/blob/master/media/retroarch-vector_invader-only.svg?raw=true',
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
        os: [
          { name: 'Windows', arch: 'x86_64' },
          { name: 'Linux', arch: 'x86_64' },
          { name: 'Linux', arch: 'aarch64' },
          { name: 'Android', arch: 'aarch64' },
        ],
      },
      {
        name: 'PCSX2',
        website: 'https://pcsx2.net',
        icon: 'https://github.com/PCSX2/pcsx2/blob/master/bin/resources/icons/AppIconLarge.png?raw=true',
        state: 'stable',
        releaseDate: DateTime.fromISO('2002-09-22'),
        platforms: ['PlayStation 2'],
        os: [
          { name: 'Windows', arch: 'x86_64' },
          { name: 'Linux', arch: 'x86_64' },
        ],
      },
      {
        name: 'RPCS3',
        website: 'https://rpcs3.net',
        icon: 'https://github.com/RPCS3/rpcs3/blob/master/rpcs3/rpcs3.svg?raw=true',
        state: 'stable',
        releaseDate: DateTime.fromISO('2011-05-23'),
        platforms: ['PlayStation 3'],
        os: [
          { name: 'Windows', arch: 'x86_64' },
          { name: 'Linux', arch: 'x86_64' },
        ],
      },
      {
        name: 'Eden',
        website: 'https://eden-emu.dev/',
        icon: 'https://git.eden-emu.dev/eden-emu/eden/raw/branch/master/dist/dev.eden_emu.eden.svg',
        state: 'stable',
        releaseDate: DateTime.fromISO('2025-05-10'),
        platforms: ['Switch'],
        os: [
          { name: 'Windows', arch: 'x86_64' },
          { name: 'Linux', arch: 'x86_64' },
          { name: 'Android', arch: 'aarch64' },
        ],
      },
      {
        name: 'Dolphin',
        website: 'https://dolphin-emu.org',
        icon: 'https://github.com/dolphin-emu/dolphin/blob/master/Data/dolphin-emu.svg?raw=true',
        state: 'stable',
        releaseDate: DateTime.fromISO('2003-09-22'),
        platforms: ['GameCube', 'Wii'],
        os: [
          { name: 'Windows', arch: 'x86_64' },
          { name: 'Windows', arch: 'aarch64' },
          { name: 'Linux', arch: 'x86_64' },
          { name: 'Linux', arch: 'aarch64' },
          { name: 'macOS', arch: 'x86_64' },
          { name: 'macOS', arch: 'aarch64' },
          { name: 'Android', arch: 'aarch64' },
        ],
      },
      {
        name: 'Cemu',
        website: 'https://cemu.info',
        icon: 'https://github.com/cemu-project/Cemu/blob/main/src/resource/logo_icon.png?raw=true',
        state: 'stable',
        releaseDate: DateTime.fromISO('2015-10-13'),
        platforms: ['Wii U'],
        os: [
          { name: 'Linux', arch: 'x86_64' },
          { name: 'macOS', arch: 'x86_64' },
          { name: 'Windows', arch: 'x86_64' },
        ],
      },
    ];

    // Create emulators and link them to platforms
    for (const {
      name,
      icon: iconUrl,
      platforms: platformNames,
      os,
      ...emulatorData
    } of emulators) {
      const icon = iconUrl
        ? await Image.fromHttp(iconUrl, { width: 256, height: 256, format: 'avif' })
        : null;
      const params = { iconId: icon?.id ?? null, ...emulatorData };
      const emulator = await Emulator.firstOrCreate({ name }, params);
      emulator.merge(params);
      await emulator.save();

      if (platformNames.length > 0) {
        const platforms = await Platform.query().whereIn('name', platformNames);
        const platformIds = platforms.map((platform) => platform.id);
        if (platformIds.length > 0) {
          await emulator.related('platforms').sync(platformIds);
        }
      }

      for (const osData of os) {
        const osModel = await OperatingSystem.findByOrFail(osData);
        await emulator.related('operatingSystems').save(osModel);
      }
    }
  }
}
