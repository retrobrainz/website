import Game from '#models/game';
import type { HttpContext } from '@adonisjs/core/http';

export default class GamesController {
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

    if (request.input('search')) {
      const search = request.input('search');
      query.where('name', 'like', `%${search}%`);
    }

    return query
      .preload('franchises')
      .preload('genres')
      .preload('platform')
      .preload('regions')
      .preload('developers')
      .preload('publishers')
      .preload('roms')
      .preload('boxart')
      .preload('logo')
      .preload('snap')
      .preload('title')
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
      .preload('snap')
      .preload('title')
      .firstOrFail();

    return game;
  }

  async update({ params, request, auth }: HttpContext) {
    // TODO validate input
    const { boxartId, logoId, snapId, titleId } = request.all();
    const game = await Game.findOrFail(params.id);

    if (auth.user!.role === 'user') {
      // users can only add missing properties
      if (boxartId && !game.boxartId) {
        game.boxartId = boxartId;
      }
      if (logoId && !game.logoId) {
        game.logoId = logoId;
      }
      if (snapId && !game.snapId) {
        game.snapId = snapId;
      }
      if (titleId && !game.titleId) {
        game.titleId = titleId;
      }
    } else if (auth.user!.role === 'admin' || auth.user!.role === 'editor') {
      // admins and editors can update all properties
      game.merge({ boxartId, logoId, snapId, titleId });
    }
    return await game.save();
  }
}
