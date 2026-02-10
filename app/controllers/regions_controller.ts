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

    const titleId = request.input('titleId');
    const franchiseId = request.input('franchiseId');
    if (titleId || franchiseId) {
      query.whereHas('games', (gameQuery) => {
        if (titleId) {
          gameQuery.where('titleId', titleId);
        }
        if (franchiseId) {
          gameQuery.whereHas('title', (titleQuery) => {
            titleQuery.whereHas('franchises', (franchiseQuery) => {
              franchiseQuery.where('franchises.id', franchiseId);
            });
          });
        }
      });
    }

    return query.orderBy('name', 'asc').exec();
  }
}
