import Game from '#models/game';
import type { HttpContext } from '@adonisjs/core/http';

export default class GamesController {
  // Regex pattern for non-word characters to ignore in search (JavaScript)
  private static readonly NON_WORD_CHARS = /[,.\-:"';&!]/g;
  // SQL character class for non-word characters (used in REGEXP_REPLACE)
  // Note: This is a hardcoded constant, not derived from user input
  private static readonly NON_WORD_CHARS_SQL = '[,.\\-:\\"\';&!]';
  // Maximum length for search query to prevent DoS
  private static readonly MAX_SEARCH_LENGTH = 200;

  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 10);
    const query = Game.query();

    if (request.input('platformId')) {
      query.where('platformId', request.input('platformId'));
    }

    if (request.input('regionId')) {
      query.whereHas('regions', (q) => {
        q.where('regions.id', request.input('regionId'));
      });
    }

    if (request.input('languageId')) {
      query.whereHas('languages', (q) => {
        q.where('languages.id', request.input('languageId'));
      });
    }

    if (
      request.input('search') &&
      typeof request.input('search') === 'string' &&
      request.input('search').length <= GamesController.MAX_SEARCH_LENGTH
    ) {
      const search = request.input('search');
      // Remove non-word characters and split into words
      const searchWords = search
        .replace(GamesController.NON_WORD_CHARS, ' ')
        .split(/\s+/)
        .filter((word) => word.length > 0);

      // Only apply search if we have valid words
      if (searchWords.length > 0) {
        // Search for each word in the game name (case insensitive, ignoring non-word characters)
        query.where((subQuery) => {
          searchWords.forEach((word) => {
            // Escape SQL LIKE wildcards (% and _) in user input
            const escapedWord = word.toLowerCase().replace(/[%_]/g, '\\$&');
            subQuery.whereRaw(
              `REGEXP_REPLACE(LOWER(name), '${GamesController.NON_WORD_CHARS_SQL}', '', 'g') LIKE ?`,
              [`%${escapedWord}%`],
            );
          });
        });
      }
    }

    return query
      .preload('franchises')
      .preload('genres')
      .preload('platform')
      .preload('regions')
      .preload('developers')
      .preload('publishers')
      .preload('roms')
      .preload('translations')
      .preload('boxart')
      .preload('logo')
      .preload('screenshot')
      .preload('titlescreen')
      .withCount('favorites')
      .orderBy('name', 'asc')
      .paginate(page, pageSize);
  }

  async show({ params }: HttpContext) {
    const game = await Game.query()
      .where('id', params.id)
      .preload('franchises')
      .preload('genres')
      .preload('platform')
      .preload('regions')
      .preload('developers')
      .preload('publishers')
      .preload('roms')
      .preload('boxart')
      .preload('logo')
      .preload('screenshot')
      .preload('titlescreen')
      .preload('translations')
      .withCount('favorites')
      .firstOrFail();

    return game;
  }

  async update({ params, request, auth }: HttpContext) {
    // TODO validate input
    const { boxartId, logoId, screenshotId, titlescreenId } = request.all();
    const game = await Game.findOrFail(params.id);

    if (auth.user!.role === 'user') {
      // users can only add missing properties
      if (boxartId && !game.boxartId) {
        game.boxartId = boxartId;
      }
      if (logoId && !game.logoId) {
        game.logoId = logoId;
      }
      if (screenshotId && !game.screenshotId) {
        game.screenshotId = screenshotId;
      }
      if (titlescreenId && !game.titlescreenId) {
        game.titlescreenId = titlescreenId;
      }
    } else if (auth.user!.role === 'admin' || auth.user!.role === 'editor') {
      // admins and editors can update all properties
      game.merge({ boxartId, logoId, screenshotId, titlescreenId });
    }
    return await game.save();
  }
}
