import Favorite from '#models/favorite';
import Game from '#models/game';
import type { HttpContext } from '@adonisjs/core/http';

export default class FavoritesController {
  /**
   * Display a list of favorites
   * Query by userId or gameId
   */
  async index({ request }: HttpContext) {
    const page = Math.max(1, request.input('page', 1));
    const pageSize = Math.min(100, Math.max(1, request.input('pageSize', 10)));
    const userId = request.input('userId');
    const gameId = request.input('gameId');

    const query = Favorite.query();

    if (userId) {
      query.where('userId', userId);
    }

    if (gameId) {
      query.where('gameId', gameId);
    }

    return await query.preload('game').preload('user').paginate(page, pageSize);
  }

  /**
   * Display a single favorite
   */
  async show({ params }: HttpContext) {
    const favorite = await Favorite.query()
      .where('id', params.id)
      .preload('game')
      .preload('user')
      .firstOrFail();

    return favorite;
  }

  /**
   * Add a favorite
   */
  async store({ request, auth, response }: HttpContext) {
    const userId = auth.user?.id;
    const gameId = request.input('gameId');

    if (!userId) {
      return response.unauthorized({ error: 'User must be authenticated' });
    }

    if (!gameId) {
      return response.badRequest({ error: 'gameId is required' });
    }

    // Validate game exists
    const game = await Game.find(gameId);
    if (!game) {
      return response.notFound({ error: 'Game not found' });
    }

    // Use firstOrCreate to get existing or create new favorite
    const searchPayload = { userId, gameId };
    const favorite = await Favorite.firstOrCreate(searchPayload);

    await favorite.load((loader) => {
      loader.load('game').load('user');
    });

    return favorite;
  }

  /**
   * Remove a favorite
   */
  async destroy({ params, auth, response }: HttpContext) {
    const userId = auth.user?.id;

    if (!userId) {
      return response.unauthorized({ error: 'User must be authenticated' });
    }

    const favorite = await Favorite.find(params.id);

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
