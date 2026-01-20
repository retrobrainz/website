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
    const userId = request.input('user_id');
    const gameId = request.input('game_id');

    const query = Favorite.query();

    if (userId) {
      query.where('user_id', userId);
    }

    if (gameId) {
      query.where('game_id', gameId);
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
    const gameId = request.input('game_id');

    if (!userId) {
      return response.unauthorized({ error: 'User must be authenticated' });
    }

    if (!gameId) {
      return response.badRequest({ error: 'game_id is required' });
    }

    // Validate game exists
    const game = await Game.find(gameId);
    if (!game) {
      return response.notFound({ error: 'Game not found' });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.query()
      .where('user_id', userId)
      .where('game_id', gameId)
      .first();

    if (existingFavorite) {
      return response.badRequest({ error: 'Game is already favorited' });
    }

    const favorite = await Favorite.create({
      userId,
      gameId,
    });

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
