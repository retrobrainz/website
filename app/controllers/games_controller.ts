import Game from '#models/game';
import { gameMergeValidator } from '#validators/game_merge_validator';
import type { HttpContext } from '@adonisjs/core/http';
import db from '@adonisjs/lucid/services/db';
import { DateTime } from 'luxon';

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

    const noDeveloper = request.input('noDeveloper');
    if (noDeveloper === 'true' || noDeveloper === true) {
      query.doesntHave('developers');
    }

    const noPublisher = request.input('noPublisher');
    if (noPublisher === 'true' || noPublisher === true) {
      query.doesntHave('publishers');
    }

    const noReleaseDate = request.input('noReleaseDate');
    if (noReleaseDate === 'true' || noReleaseDate === true) {
      query.whereNull('releaseDate');
    }

    const noLanguage = request.input('noLanguage');
    if (noLanguage === 'true' || noLanguage === true) {
      query.doesntHave('languages');
    }

    const noRom = request.input('noRom');
    if (noRom === 'true' || noRom === true) {
      query.doesntHave('roms');
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
        q.preload('translations');
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
        q.preload('translations');
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

  async store({ request, auth, response }: HttpContext) {
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    // TODO validate input
    const {
      platformId,
      titleId,
      name,
      releaseDate,
      esrbRating,
      pegiRating,
      ceroRating,
      boxartId,
      logoId,
      screenshotId,
      titlescreenId,
      developerIds,
      publisherIds,
      regionIds,
      languageIds,
    } = request.all();

    const game = await Game.create({
      platformId,
      titleId,
      name,
      releaseDate: releaseDate ? DateTime.fromISO(releaseDate) : null,
      esrbRating,
      pegiRating,
      ceroRating,
      boxartId,
      logoId,
      screenshotId,
      titlescreenId,
    });

    if (Array.isArray(developerIds)) {
      await game.related('developers').attach(developerIds);
    }
    if (Array.isArray(publisherIds)) {
      await game.related('publishers').attach(publisherIds);
    }
    if (Array.isArray(regionIds)) {
      await game.related('regions').attach(regionIds);
    }
    if (Array.isArray(languageIds)) {
      await game.related('languages').attach(languageIds);
    }

    await game.load('title');
    await game.load('platform');
    await game.load('regions');
    await game.load('developers');
    await game.load('publishers');
    await game.load('languages');
    await game.load('boxart');
    await game.load('logo');
    await game.load('screenshot');
    await game.load('titlescreen');

    return response.created(game);
  }

  async update({ params, request, auth }: HttpContext) {
    // TODO validate input
    const {
      platformId,
      titleId,
      name,
      releaseDate,
      esrbRating,
      pegiRating,
      ceroRating,
      boxartId,
      logoId,
      screenshotId,
      titlescreenId,
      developerIds,
      publisherIds,
      regionIds,
      languageIds,
    } = request.all();
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
      const payload: Record<string, unknown> = {};
      if (platformId !== undefined) {
        payload.platformId = platformId;
      }
      if (titleId !== undefined) {
        payload.titleId = titleId;
      }
      if (name !== undefined) {
        payload.name = name;
      }
      if (releaseDate !== undefined) {
        payload.releaseDate = releaseDate ? DateTime.fromISO(releaseDate) : null;
      }
      if (esrbRating !== undefined) {
        payload.esrbRating = esrbRating;
      }
      if (pegiRating !== undefined) {
        payload.pegiRating = pegiRating;
      }
      if (ceroRating !== undefined) {
        payload.ceroRating = ceroRating;
      }
      if (boxartId !== undefined) {
        payload.boxartId = boxartId;
      }
      if (logoId !== undefined) {
        payload.logoId = logoId;
      }
      if (screenshotId !== undefined) {
        payload.screenshotId = screenshotId;
      }
      if (titlescreenId !== undefined) {
        payload.titlescreenId = titlescreenId;
      }

      game.merge(payload);

      if (Array.isArray(developerIds)) {
        await game.related('developers').sync(developerIds);
      }
      if (Array.isArray(publisherIds)) {
        await game.related('publishers').sync(publisherIds);
      }
      if (Array.isArray(regionIds)) {
        await game.related('regions').sync(regionIds);
      }
      if (Array.isArray(languageIds)) {
        await game.related('languages').sync(languageIds);
      }
    }

    await game.save();

    await game.load('title');
    await game.load('platform');
    await game.load('regions');
    await game.load('developers');
    await game.load('publishers');
    await game.load('languages');
    await game.load('boxart');
    await game.load('logo');
    await game.load('screenshot');
    await game.load('titlescreen');

    return game;
  }

  async merge({ params, request, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const sourceGameId = Number(params.id);
    const { targetGameId } = await request.validateUsing(gameMergeValidator);

    if (sourceGameId === targetGameId) {
      return response.badRequest({ message: 'Source and target games must be different' });
    }

    const sourceGame = await Game.query()
      .where('id', sourceGameId)
      .select('id', 'platformId')
      .firstOrFail();
    const targetGame = await Game.query()
      .where('id', targetGameId)
      .select('id', 'platformId')
      .firstOrFail();

    if (sourceGame.platformId !== targetGame.platformId) {
      return response.badRequest({
        message: 'Source and target games must be on the same platform',
      });
    }

    await db.transaction(async (trx) => {
      await Game.query({ client: trx }).where('id', sourceGameId).firstOrFail();
      await Game.query({ client: trx }).where('id', targetGameId).firstOrFail();

      const developerRows = await trx
        .from('game_developer')
        .where('game_id', sourceGameId)
        .select('company_id');
      if (developerRows.length > 0) {
        await trx
          .table('game_developer')
          .insert(
            developerRows.map((row) => ({
              game_id: targetGameId,
              company_id: row.company_id,
            })),
          )
          .onConflict(['game_id', 'company_id'])
          .ignore();
      }

      const publisherRows = await trx
        .from('game_publisher')
        .where('game_id', sourceGameId)
        .select('company_id');
      if (publisherRows.length > 0) {
        await trx
          .table('game_publisher')
          .insert(
            publisherRows.map((row) => ({
              game_id: targetGameId,
              company_id: row.company_id,
            })),
          )
          .onConflict(['game_id', 'company_id'])
          .ignore();
      }

      const regionRows = await trx
        .from('game_region')
        .where('game_id', sourceGameId)
        .select('region_id');
      if (regionRows.length > 0) {
        await trx
          .table('game_region')
          .insert(
            regionRows.map((row) => ({
              game_id: targetGameId,
              region_id: row.region_id,
            })),
          )
          .onConflict(['game_id', 'region_id'])
          .ignore();
      }

      const languageRows = await trx
        .from('game_language')
        .where('game_id', sourceGameId)
        .select('language_id');
      if (languageRows.length > 0) {
        await trx
          .table('game_language')
          .insert(
            languageRows.map((row) => ({
              game_id: targetGameId,
              language_id: row.language_id,
            })),
          )
          .onConflict(['game_id', 'language_id'])
          .ignore();
      }

      const favoriteRows = await trx
        .from('game_favorites')
        .where('game_id', sourceGameId)
        .select('user_id');
      if (favoriteRows.length > 0) {
        await trx
          .table('game_favorites')
          .insert(
            favoriteRows.map((row) => ({
              user_id: row.user_id,
              game_id: targetGameId,
            })),
          )
          .onConflict(['user_id', 'game_id'])
          .ignore();
      }

      const translationRows = await trx
        .from('game_translations')
        .where('game_id', sourceGameId)
        .select('locale', 'name');
      if (translationRows.length > 0) {
        await trx
          .table('game_translations')
          .insert(
            translationRows.map((row) => ({
              game_id: targetGameId,
              locale: row.locale,
              name: row.name,
            })),
          )
          .onConflict(['game_id', 'locale'])
          .ignore();
      }

      await trx.from('roms').where('game_id', sourceGameId).update({ game_id: targetGameId });

      await trx.from('games').where('id', sourceGameId).delete();
    });

    return Game.query()
      .where('id', targetGameId)
      .preload('title', (q) => {
        q.preload('translations');
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
  }
}
