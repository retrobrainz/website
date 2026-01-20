import Game from '#models/game';
import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http';

export default class FavoritesController {
  /**
   * Get favorites for a user
   */
  async userFavorites({ params, request }: HttpContext) {
    const userId = params.id;
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 10);

    const user = await User.findOrFail(userId);
    return await user
      .related('favorites')
      .query()
      .preload('platform')
      .preload('boxart')
      .preload('logo')
      .preload('snap')
      .preload('title')
      .paginate(page, pageSize);
  }

  /**
   * Get users who favorited a game
   */
  async gameFavorites({ params, request }: HttpContext) {
    const gameId = params.id;
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 10);

    const game = await Game.findOrFail(gameId);
    return await game.related('favoritedBy').query().paginate(page, pageSize);
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

    const user = await User.findOrFail(userId);

    // Check if already favorited
    const existingFavorite = await user
      .related('favorites')
      .query()
      .where('games.id', gameId)
      .first();

    if (existingFavorite) {
      return response.badRequest({ error: 'Game is already favorited' });
    }

    await user.related('favorites').attach([gameId]);

    return { message: 'Favorite added successfully' };
  }

  /**
   * Remove a favorite
   */
  async destroy({ params, auth, response }: HttpContext) {
    const userId = auth.user?.id;
    const gameId = params.game_id;

    if (!userId) {
      return response.unauthorized({ error: 'User must be authenticated' });
    }

    if (!gameId) {
      return response.badRequest({ error: 'game_id is required' });
    }

    const user = await User.findOrFail(userId);
    await user.related('favorites').detach([gameId]);

    return { message: 'Favorite removed successfully' };
  }
}
