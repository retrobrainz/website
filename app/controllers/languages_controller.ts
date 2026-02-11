import Language from '#models/language';
import type { HttpContext } from '@adonisjs/core/http';

export default class LanguagesController {
  async index({ request }: HttpContext) {
    const query = Language.query();

    const platformId = request.input('platformId');
    const titleId = request.input('titleId');
    const franchiseId = request.input('franchiseId');
    const developerId = request.input('developerId');
    const publisherId = request.input('publisherId');
    if (platformId || titleId || franchiseId || developerId || publisherId) {
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
        if (developerId) {
          gameQuery.whereHas('developers', (developerQuery) => {
            developerQuery.where('companies.id', developerId);
          });
        }
        if (publisherId) {
          gameQuery.whereHas('publishers', (publisherQuery) => {
            publisherQuery.where('companies.id', publisherId);
          });
        }
      });
    }
    return query.orderBy('name', 'asc').exec();
  }
}
