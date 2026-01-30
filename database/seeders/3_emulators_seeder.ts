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
        name: 'PCSX2',
        website: 'https://pcsx2.net',
        sourceCode: 'https://github.com/PCSX2/pcsx2',
        icon: 'https://github.com/PCSX2/pcsx2/blob/master/bin/resources/icons/AppIconLarge.png?raw=true',
        screenshot: 'https://pcsx2.net/images/presskit/2023/main.png',
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
        sourceCode: 'https://github.com/RPCS3/rpcs3',
        icon: 'https://github.com/RPCS3/rpcs3/blob/master/rpcs3/rpcs3.svg?raw=true',
        screenshot: 'https://rpcs3.net/cdn/netplay.png',
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
        sourceCode: 'https://git.eden-emu.dev/eden-emu/eden',
        icon: 'https://git.eden-emu.dev/eden-emu/eden/raw/branch/master/dist/dev.eden_emu.eden.svg',
        screenshot: 'https://git.eden-emu.dev/eden-emu/eden/raw/branch/master/dist/screenshots/zelda-totk.png',
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
        sourceCode: 'https://github.com/dolphin-emu/dolphin',
        icon: 'https://github.com/dolphin-emu/dolphin/blob/master/Data/dolphin-emu.svg?raw=true',
        screenshot: 'https://dolphin-emu.org/m/user/game-screenshot/1/6/8/16850.jpg',
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
        sourceCode: 'https://github.com/cemu-project/Cemu',
        icon: 'https://github.com/cemu-project/Cemu/blob/main/src/resource/logo_icon.png?raw=true',
        screenshot: 'https://cemu.info/img/screenshot.png',
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
      screenshot: screenshotUrl,
      platforms: platformNames,
      os,
      ...emulatorData
    } of emulators) {
      const icon = iconUrl
        ? await Image.fromHttp(iconUrl, { width: 256, height: 256, format: 'avif' })
        : null;
      const screenshot = screenshotUrl
        ? await Image.fromHttp(screenshotUrl, { width: 1280, height: 720, format: 'avif' })
        : null;
      const params = { iconId: icon?.id ?? null, screenshotId: screenshot?.id ?? null, ...emulatorData };
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
