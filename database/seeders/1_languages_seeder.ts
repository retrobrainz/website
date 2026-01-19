import Language from '#models/language';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  async run() {
    await Promise.all(
      [
        { code: 'ar', name: 'Arabic' },
        { code: 'cs', name: 'Czech' },
        { code: 'da', name: 'Danish' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fi', name: 'Finnish' },
        { code: 'fr', name: 'French' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'it', name: 'Italian' },
        { code: 'nl', name: 'Dutch' },
        { code: 'no', name: 'Norwegian' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
        { code: 'zh', name: 'Chinese' },
      ].map(({ code, name }) => Language.firstOrCreate({ code }, { code, name })),
    );
  }
}
