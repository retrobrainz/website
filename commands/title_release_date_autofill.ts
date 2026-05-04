import { BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
import db from '@adonisjs/lucid/services/db';

export default class TitleReleaseDateAutofill extends BaseCommand {
  static commandName = 'title:releasedate:autofill';
  static description = 'Autofill title release dates from the earliest related game release date';

  static options: CommandOptions = {
    startApp: true,
  };

  async run() {
    const result = await db.rawQuery(`
      WITH computed AS (
        SELECT title_id, MIN(release_date) AS min_release_date
        FROM games
        WHERE title_id IS NOT NULL
          AND release_date IS NOT NULL
        GROUP BY title_id
      )
      UPDATE titles
      SET release_date = computed.min_release_date
      FROM computed
      WHERE titles.id = computed.title_id
        AND titles.release_date IS NULL
        AND computed.min_release_date IS NOT NULL
    `);

    const updatedRows = Number((result as { rowCount?: number }).rowCount ?? 0);
    this.logger.info(`Autofill complete. Updated ${updatedRows} title release dates.`);
  }
}
