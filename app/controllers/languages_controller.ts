import Language from '#models/language';
import type { HttpContext } from '@adonisjs/core/http';

export default class RegionsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const query = Language.query();
    if (request.input('platformId')) {
      query.whereHas('games', (gameQuery) => {
        gameQuery.where('platformId', request.input('platformId'));
      });
    }
    return query.orderBy('name', 'asc').exec();
  }
}
