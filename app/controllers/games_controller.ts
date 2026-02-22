import Game from '#models/game';
import type { HttpContext } from '@adonisjs/core/http';

export default class GamesController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 10);
    const query = Game.query().withCount('favorites');

    const genreId = request.input('genreId');
    if (genreId) {
      query.whereHas('title', (q) => {
        q.whereHas('genres', (qq) => {
          qq.where('genres.id', genreId);
        });
      });
    }

    const franchiseId = request.input('franchiseId');
    if (franchiseId) {
      query.whereHas('title', (q) => {
        q.whereHas('franchises', (qq) => {
          qq.where('franchises.id', franchiseId);
        });
      });
    }

    const titleId = request.input('titleId');
    if (titleId) {
      query.where('titleId', titleId);
    }

    const developerId = request.input('developerId');
    if (developerId) {
      query.whereHas('developers', (q) => {
        q.where('companies.id', developerId);
      });
    }

    const publisherId = request.input('publisherId');
    if (publisherId) {
      query.whereHas('publishers', (q) => {
        q.where('companies.id', publisherId);
      });
    }

    const platformId = request.input('platformId');
    if (platformId) {
      query.where('platformId', platformId);
    }

    const favoriteUserId = request.input('favoriteUserId');
    if (favoriteUserId) {
      query.whereHas('favorites', (q) => {
        q.where('game_favorites.user_id', favoriteUserId);
      });
    }

    const regionId = request.input('regionId');
    if (regionId) {
      query.whereHas('regions', (q) => {
        q.where('regions.id', regionId);
      });
    }

    const languageId = request.input('languageId');
    if (languageId) {
      query.whereHas('languages', (q) => {
        q.where('languages.id', languageId);
      });
    }

    const search = request.input('search');
    if (search) {
      search
        .split(' ')
        .filter(Boolean)
        .forEach((term: string) => {
          query.where('name', 'ilike', `%${term}%`);
        });
    }

    const orderBy = request.input('orderBy');
    if (orderBy === 'random') {
      query.orderByRaw('RANDOM()');
    } else if (orderBy === 'favoritesCount') {
      query.orderBy('favorites_count', 'desc');
    } else {
      query.orderBy('name', 'asc');
    }

    return query
      .preload('title', (q) => {
        q.preload('franchises', (qq) => qq.preload('translations'));
        q.preload('genres', (qq) => qq.preload('translations'));
      })
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
      .paginate(page, pageSize);
  }

  async show({ params }: HttpContext) {
    const game = await Game.query()
      .where('id', params.id)
      .preload('title', (q) => {
        q.preload('franchises', (qq) => qq.preload('translations'));
        q.preload('genres', (qq) => qq.preload('translations'));
      })
      .preload('platform')
      .preload('regions')
      .preload('developers')
      .preload('publishers')
      .preload('languages')
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
