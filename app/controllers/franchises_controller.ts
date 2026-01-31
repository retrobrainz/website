import Franchise from '#models/franchise';
import type { HttpContext } from '@adonisjs/core/http';

export default class FranchisesController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 10);
    return Franchise.query()
      .preload('translations')
      .withCount('games')
      .orderBy('games_count', 'desc')
      .paginate(page, pageSize);
  }

  /**
   * Display a single resource
   */
  async show({ params }: HttpContext) {
    return Franchise.query()
      .where('id', params.id)
      .preload('translations')
      .preload('games', (query) => {
        query.preload('platform').preload('boxart').orderBy('name');
      })
      .withCount('games')
      .firstOrFail();
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    // Only admin and editor can create franchises
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return { error: 'Unauthorized' };
    }

    const data = request.only(['name']);
    return Franchise.create(data);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth }: HttpContext) {
    // Only admin and editor can update franchises
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return { error: 'Unauthorized' };
    }

    const franchise = await Franchise.findOrFail(params.id);
    const data = request.only(['name']);
    franchise.merge(data);
    return franchise.save();
  }
}
