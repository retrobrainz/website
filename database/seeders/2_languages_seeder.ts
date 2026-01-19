import Language from '#models/language';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  async run() {
    await Promise.all(
      [
        { code: 'en', name: 'English' },
        { code: 'ja', name: 'Japanese' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'es', name: 'Spanish' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese' },
        { code: 'nl', name: 'Dutch' },
        { code: 'sv', name: 'Swedish' },
        { code: 'pl', name: 'Polish' },
        { code: 'fi', name: 'Finnish' },
        { code: 'no', name: 'Norwegian' },
        { code: 'da', name: 'Danish' },
        { code: 'cs', name: 'Czech' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'tr', name: 'Turkish' },
        { code: 'ar', name: 'Arabic' },
      ].map(({ code, name }) => Language.firstOrCreate({ code }, { code, name })),
    );
  }
}
