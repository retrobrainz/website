import Region from '#models/region';
import type { HttpContext } from '@adonisjs/core/http';

export default class RegionsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const query = Region.query();
    if (request.input('platformId')) {
      query.whereHas('games', (gameQuery) => {
        gameQuery.where('platformId', request.input('platformId'));
      });
    }

    if (request.input('titleId')) {
      query.whereHas('games', (gameQuery) => {
        gameQuery.where('titleId', request.input('titleId'));
      });
    }

    return query.orderBy('name', 'asc').exec();
  }
}
