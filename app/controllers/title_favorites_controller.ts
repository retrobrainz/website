import Title from '#models/title';
import TitleFavorite from '#models/title_favorite';
import type { HttpContext } from '@adonisjs/core/http';

export default class TitleFavoritesController {
  /**
   * Display a list of title favorites
   * Query by userId or titleId
   */
  async index({ request, params }: HttpContext) {
    const page = Math.max(1, request.input('page', 1));
    const pageSize = Math.min(100, Math.max(1, request.input('pageSize', 10)));
    const userId = request.input('userId');
    const titleId = params.title_id;

    const query = TitleFavorite.query();

    if (userId) {
      query.where('userId', userId);
    }

    if (titleId) {
      query.where('titleId', titleId);
    }

    return await query.preload('title').preload('user').paginate(page, pageSize);
  }

  /**
   * Display a single title favorite
   */
  async show({ params }: HttpContext) {
    const favorite = await TitleFavorite.query()
      .where('id', params.id)
      .preload('title')
      .preload('user')
      .firstOrFail();

    return favorite;
  }

  /**
   * Add a title favorite
   */
  async store({ params, auth, response }: HttpContext) {
    const userId = auth.user?.id;
    const titleId = params.title_id;

    if (!userId) {
      return response.unauthorized({ error: 'User must be authenticated' });
    }

    if (!titleId) {
      return response.badRequest({ error: 'titleId is required' });
    }

    // Validate title exists
    const title = await Title.find(titleId);
    if (!title) {
      return response.notFound({ error: 'Title not found' });
    }

    // Use firstOrCreate to get existing or create new favorite
    const searchPayload = { userId, titleId };
    const favorite = await TitleFavorite.firstOrCreate(searchPayload);

    await favorite.load((loader) => {
      loader.load('title').load('user');
    });

    return favorite;
  }

  /**
   * Remove a title favorite
   */
  async destroy({ params, auth, response }: HttpContext) {
    const userId = auth.user?.id;

    if (!userId) {
      return response.unauthorized({ error: 'User must be authenticated' });
    }

    const favorite = await TitleFavorite.find(params.id);

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
