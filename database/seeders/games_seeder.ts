import Game from '#models/game';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  async run() {
    const smb = await Game.firstOrCreate({
      platform: 'NES',
      title: 'Super Mario Bros.',
      releaseDate: DateTime.fromISO('1985-09-13'),
    });

    await smb.related('translations').firstOrCreate({
      locale: 'ja',
      title: 'スーパーマリオブラザーズ',
    });

    await smb.related('translations').firstOrCreate({
      locale: 'zh-CN',
      title: '超级马里奥兄弟',
    });

    await smb.related('translations').firstOrCreate({
      locale: 'zh-TW',
      title: '超級瑪利歐兄弟',
    });
  }
}
