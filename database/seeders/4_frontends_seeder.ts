import Emulator from '#models/emulator';
import Frontend from '#models/frontend';
import Image from '#models/image';
import OperatingSystem from '#models/operating_system';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  async run() {
    // Define frontends with their metadata
    const frontends = [
      {
        name: 'RetroArch',
        website: 'https://www.retroarch.com',
        sourceCode: 'https://github.com/libretro/RetroArch',
        icon: 'https://github.com/libretro/RetroArch/blob/master/media/com.libretro.RetroArch.svg?raw=true',
        screenshot: 'https://www.retroarch.com/images/ozone-playlists.png',
        emulators: ['PCSX2', 'Dolphin'],
        os: [
          { name: 'Windows', arch: 'x86_64' },
          { name: 'Linux', arch: 'x86_64' },
          { name: 'Linux', arch: 'aarch64' },
          { name: 'macOS', arch: 'x86_64' },
          { name: 'macOS', arch: 'aarch64' },
          { name: 'Android', arch: 'aarch64' },
          { name: 'iOS', arch: 'aarch64' },
        ],
      },
      {
        name: 'ES-DE',
        website: 'https://es-de.org',
        sourceCode: 'https://gitlab.com/es-de/emulationstation-de',
        icon: 'https://gitlab.com/es-de/emulationstation-de/-/raw/master/es-app/assets/org.es_de.frontend.svg?ref_type=heads',
        screenshot:
          'https://gitlab.com/es-de/emulationstation-de/-/raw/master/images/es-de_system_view.png?ref_type=heads',
        emulators: ['PCSX2', 'Dolphin'],
        os: [
          { name: 'Windows', arch: 'x86_64' },
          { name: 'Linux', arch: 'x86_64' },
          { name: 'macOS', arch: 'x86_64' },
          { name: 'macOS', arch: 'aarch64' },
        ],
      },
      {
        name: 'Pegasus',
        website: 'https://pegasus-frontend.org',
        sourceCode: 'https://github.com/mmatyas/pegasus-frontend',
        icon: 'https://github.com/mmatyas/pegasus-frontend/blob/master/assets/icon.png?raw=true',
        screenshot: 'https://pegasus-frontend.org/img/screens/s0.jpg',
        emulators: ['PCSX2', 'Dolphin'],
        os: [
          { name: 'Windows', arch: 'x86_64' },
          { name: 'Linux', arch: 'x86_64' },
          { name: 'Linux', arch: 'aarch64' },
          { name: 'macOS', arch: 'x86_64' },
          { name: 'Android', arch: 'aarch64' },
        ],
      },
    ];

    // Create frontends and link them to emulators and operating systems
    for (const {
      name,
      website,
      sourceCode,
      icon: iconUrl,
      screenshot: screenshotUrl,
      emulators: emulatorNames,
      os,
    } of frontends) {
      const frontend = await Frontend.firstOrCreate({ name }, { name, website, sourceCode });
      frontend.merge({ website, sourceCode });

      if (iconUrl) {
        const image = await Image.fromHttp(iconUrl, { width: 256, height: 256, format: 'avif' });
        frontend.iconId = image.id;
      }

      if (screenshotUrl) {
        const screenshot = await Image.fromHttp(screenshotUrl, {
          width: 1280,
          height: 720,
          format: 'avif',
        });
        frontend.screenshotId = screenshot.id;
      }

      await frontend.save();

      // Link to emulators
      if (emulatorNames.length > 0) {
        const emulators = await Emulator.query().whereIn('name', emulatorNames);
        const emulatorIds = emulators.map((emulator) => emulator.id);
        if (emulatorIds.length > 0) {
          await frontend.related('emulators').sync(emulatorIds);
        }
      }

      // Link to operating systems
      for (const osData of os) {
        const osModel = await OperatingSystem.query()
          .where('name', osData.name)
          .where('arch', osData.arch)
          .firstOrFail();
        await frontend.related('operatingSystems').save(osModel);
      }
    }
  }
}
