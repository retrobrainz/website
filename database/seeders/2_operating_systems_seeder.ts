import OperatingSystem from '#models/operating_system';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  async run() {
    await Promise.all(
      [
        { name: 'Android', arch: 'aarch64' },
        { name: 'iOS', arch: 'aarch64' },
        { name: 'Linux', arch: 'aarch64' },
        { name: 'Linux', arch: 'x86_64' },
        { name: 'macOS', arch: 'aarch64' },
        { name: 'macOS', arch: 'x86_64' },
        { name: 'Windows', arch: 'aarch64' },
        { name: 'Windows', arch: 'x86_64' },
      ].map(({ name, arch }) => OperatingSystem.firstOrCreate({ name, arch }, { name, arch })),
    );
  }
}
