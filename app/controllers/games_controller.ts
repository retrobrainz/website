import Game from '#models/game';
import type { HttpContext } from '@adonisjs/core/http';

export default class GamesController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 10);
    return Game.query()
      .preload('title', (query) => query.preload('translations'))
      .preload('platform')
      .preload('regions')
      .paginate(page, pageSize);
  }
}
