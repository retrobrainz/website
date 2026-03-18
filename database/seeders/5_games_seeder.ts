/* eslint-disable no-console */
import Platform from '#models/platform';
import { deleteGithubRepo } from '#utils/platform';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  async run() {
    const platforms = await Platform.query().orderByRaw('RANDOM()');

    for (const platform of platforms) {
      await platform.load('company');
      console.log(`start import: ${platform.name}`);
      await platform.importLibretro();
      console.log('done');
    }

    process.env.NODE_ENV === 'production' && (await deleteGithubRepo('libretro-database'));
  }
}
