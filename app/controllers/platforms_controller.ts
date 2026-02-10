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

    if (request.input('titleId')) {
      query.whereHas('games', (gameQuery) => {
        gameQuery.where('titleId', request.input('titleId'));
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
