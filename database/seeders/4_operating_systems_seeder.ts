import OperatingSystem from '#models/operating_system';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  async run() {
    await Promise.all(
      [
        { name: 'Windows', arch: 'x64' },
        { name: 'Windows', arch: 'aarch64' },
        { name: 'Linux', arch: 'x64' },
        { name: 'Linux', arch: 'aarch64' },
        { name: 'Android', arch: 'aarch64' },
      ].map(({ name, arch }) => OperatingSystem.firstOrCreate({ name, arch }, { name, arch })),
    );
  }
}
