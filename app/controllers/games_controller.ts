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

    return query
      .preload('title', (q) => q.preload('translations'))
      .preload('platform')
      .preload('regions')
      .preload('roms')
      .preload('images')
      .paginate(page, pageSize);
  }
}
