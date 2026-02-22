import Language from '#models/language';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  async run() {
    await Promise.all(
      [
        { code: 'af', name: 'Afrikaans' },
        { code: 'ar', name: 'Arabic' },
        { code: 'bg', name: 'Bulgarian' },
        { code: 'ca', name: 'Catalan' },
        { code: 'cs', name: 'Czech' },
        { code: 'da', name: 'Danish' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'eu', name: 'Basque' },
        { code: 'fi', name: 'Finnish' },
        { code: 'fr', name: 'French' },
        { code: 'gd', name: 'Gaelic' },
        { code: 'hi', name: 'Hindi' },
        { code: 'hr', name: 'Croatian' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'kw', name: 'Cornish' },
        { code: 'in', name: 'Indonesian' },
        { code: 'it', name: 'Italian' },
        { code: 'ni', name: 'Nigerian' },
        { code: 'nl', name: 'Dutch' },
        { code: 'no', name: 'Norwegian' },
        { code: 'pa', name: 'Punjabi' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ro', name: 'Romanian' },
        { code: 'ru', name: 'Russian' },
        { code: 'sk', name: 'Slovak' },
        { code: 'sv', name: 'Swedish' },
        { code: 'ta', name: 'Tamil' },
        { code: 'tr', name: 'Turkish' },
        { code: 'zh-CN', name: 'Chinese (Simplified)' },
        { code: 'zh-TW', name: 'Chinese (Traditional)' },
      ].map(({ code, name }) => Language.firstOrCreate({ code }, { code, name })),
    );
  }
}
