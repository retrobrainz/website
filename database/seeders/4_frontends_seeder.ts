import Emulator from '#models/emulator';
import Frontend from '#models/frontend';
import OperatingSystem from '#models/operating_system';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  async run() {
    // Define frontends with their metadata
    const frontends = [
      {
        name: 'RetroArch',
        website: 'https://www.retroarch.com',
        emulators: ['PCSX2', 'Dolphin'],
        os: [
          { name: 'Windows', arch: 'x86_64' },
          { name: 'Linux', arch: 'x86_64' },
          { name: 'Linux', arch: 'aarch64' },
          { name: 'macOS', arch: 'x86_64' },
          { name: 'macOS', arch: 'aarch64' },
          { name: 'Android', arch: 'aarch64' },
        ],
      },
      {
        name: 'ES-DE',
        website: 'https://es-de.org',
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
    for (const { name, website, emulators: emulatorNames, os } of frontends) {
      const frontend = await Frontend.firstOrCreate({ name }, { name, website });
      frontend.merge({ website });
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
