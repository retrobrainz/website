import Emulator from '#models/emulator';
import EmulatorFavorite from '#models/emulator_favorite';
import type { HttpContext } from '@adonisjs/core/http';

export default class EmulatorFavoritesController {
  /**
   * Display a list of emulator favorites
   * Query by userId or emulatorId
   */
  async index({ request, params }: HttpContext) {
    const page = Math.max(1, request.input('page', 1));
    const pageSize = Math.min(100, Math.max(1, request.input('pageSize', 10)));
    const userId = request.input('userId');
    const emulatorId = params.emulator_id;

    const query = EmulatorFavorite.query();

    if (userId) {
      query.where('userId', userId);
    }

    if (emulatorId) {
      query.where('emulatorId', emulatorId);
    }

    return await query
      .preload('emulator', (q) => {
        q.preload('icon');
      })
      .preload('user')
      .paginate(page, pageSize);
  }

  /**
   * Display a single emulator favorite
   */
  async show({ params }: HttpContext) {
    const favorite = await EmulatorFavorite.query()
      .where('id', params.id)
      .preload('emulator')
      .preload('user')
      .firstOrFail();

    return favorite;
  }

  /**
   * Add an emulator favorite
   */
  async store({ params, auth, response }: HttpContext) {
    const userId = auth.user?.id;
    const emulatorId = params.emulator_id;

    if (!userId) {
      return response.unauthorized({ error: 'User must be authenticated' });
    }

    if (!emulatorId) {
      return response.badRequest({ error: 'emulatorId is required' });
    }

    // Validate emulator exists
    const emulator = await Emulator.find(emulatorId);
    if (!emulator) {
      return response.notFound({ error: 'Emulator not found' });
    }

    // Use firstOrCreate to get existing or create new favorite
    const searchPayload = { userId, emulatorId };
    const favorite = await EmulatorFavorite.firstOrCreate(searchPayload);

    await favorite.load((loader) => {
      loader.load('emulator').load('user');
    });

    return favorite;
  }

  /**
   * Remove an emulator favorite
   */
  async destroy({ params, auth, response }: HttpContext) {
    const userId = auth.user?.id;

    if (!userId) {
      return response.unauthorized({ error: 'User must be authenticated' });
    }

    const favorite = await EmulatorFavorite.find(params.id);

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
