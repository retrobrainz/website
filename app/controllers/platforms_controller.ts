import Platform from '#models/platform';
import type { HttpContext } from '@adonisjs/core/http';

export default class PlatformsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const query = Platform.query()
      .orderBy('releaseDate', 'desc')
      .preload('company')
      .preload('logo')
      .preload('photo')
      .withCount('games');

    const franchiseId = request.input('franchiseId');
    const titleId = request.input('titleId');
    if (franchiseId || titleId) {
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

    return query.exec();
  }

  async show({ params }: { params: { id: string } }) {
    const platform = await Platform.query()
      .where('id', params.id)
      .preload('company')
      .preload('emulators')
      .preload('logo')
      .preload('photo')
      .firstOrFail();

    return platform;
  }
}
