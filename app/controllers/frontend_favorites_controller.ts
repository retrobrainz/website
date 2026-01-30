import Frontend from '#models/frontend';
import FrontendFavorite from '#models/frontend_favorite';
import type { HttpContext } from '@adonisjs/core/http';

export default class FrontendFavoritesController {
  /**
   * Display a list of frontend favorites
   * Query by userId or frontendId
   */
  async index({ request }: HttpContext) {
    const page = Math.max(1, request.input('page', 1));
    const pageSize = Math.min(100, Math.max(1, request.input('pageSize', 10)));
    const userId = request.input('userId');
    const frontendId = request.input('frontendId');

    const query = FrontendFavorite.query();

    if (userId) {
      query.where('userId', userId);
    }

    if (frontendId) {
      query.where('frontendId', frontendId);
    }

    return await query
      .preload('frontend', (q) => {
        q.preload('icon');
      })
      .preload('user')
      .paginate(page, pageSize);
  }

  /**
   * Display a single frontend favorite
   */
  async show({ params }: HttpContext) {
    const favorite = await FrontendFavorite.query()
      .where('id', params.id)
      .preload('frontend')
      .preload('user')
      .firstOrFail();

    return favorite;
  }

  /**
   * Add a frontend favorite
   */
  async store({ request, auth, response }: HttpContext) {
    const userId = auth.user?.id;
    const frontendId = request.input('frontendId');

    if (!userId) {
      return response.unauthorized({ error: 'User must be authenticated' });
    }

    if (!frontendId) {
      return response.badRequest({ error: 'frontendId is required' });
    }

    // Validate frontend exists
    const frontend = await Frontend.find(frontendId);
    if (!frontend) {
      return response.notFound({ error: 'Frontend not found' });
    }

    // Use firstOrCreate to get existing or create new favorite
    const searchPayload = { userId, frontendId };
    const favorite = await FrontendFavorite.firstOrCreate(searchPayload);

    await favorite.load((loader) => {
      loader.load('frontend').load('user');
    });

    return favorite;
  }

  /**
   * Remove a frontend favorite
   */
  async destroy({ params, auth, response }: HttpContext) {
    const userId = auth.user?.id;

    if (!userId) {
      return response.unauthorized({ error: 'User must be authenticated' });
    }

    const favorite = await FrontendFavorite.find(params.id);

    if (!favorite) {
      return response.notFound({ error: 'Favorite not found' });
    }

    // Ensure user can only delete their own favorites
    if (favorite.userId !== userId) {
      return response.forbidden({ error: 'You can only delete your own favorites' });
    }

    await favorite.delete();

    return { message: 'Favorite removed successfully' };
  }
}
