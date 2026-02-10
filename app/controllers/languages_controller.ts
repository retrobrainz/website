import Language from '#models/language';
import type { HttpContext } from '@adonisjs/core/http';

export default class LanguagesController {
  async index({ request }: HttpContext) {
    const query = Language.query();

    const platformId = request.input('platformId');
    const titleId = request.input('titleId');
    const franchiseId = request.input('franchiseId');
    if (platformId || titleId || franchiseId) {
      query.whereHas('games', (gameQuery) => {
        if (platformId) {
          gameQuery.where('platformId', platformId);
        }
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
