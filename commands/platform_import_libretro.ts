import Platform from '#models/platform';
import { args, BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';

export default class PlatformImportLibretro extends BaseCommand {
  static commandName = 'platform:import:libretro';
  static description = 'Import platform games data from libretro database';

  static options: CommandOptions = {
    startApp: true,
  };

  @args.string({
    description: 'Platform name (imports all platforms if not specified)',
    required: false,
  })
  declare platformName: string | undefined;

  async run() {
    const platforms = this.platformName
      ? await Platform.query().where('name', this.platformName)
      : await Platform.query().orderByRaw('RANDOM()');

    for (const platform of platforms) {
      await platform.load('company');
      this.logger.info(`Importing platform: ${platform.name}`);
      await platform.importLibretro();
      this.logger.info('done');
    }

    process.env.NODE_ENV === 'production' && (await Platform.deleteGithubRepo('libretro-database'));
  }
}
