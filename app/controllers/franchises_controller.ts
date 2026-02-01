import Franchise from '#models/franchise';
import type { HttpContext } from '@adonisjs/core/http';

export default class FranchisesController {
  /**
   * Display a list of resource
   */
  async index({ request, i18n }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 24);
    const locale = request.input('locale', i18n.locale);

    const query = Franchise.query().withCount('games').orderBy('games_count', 'desc');

    if (locale) {
      query.preload('translations', (q) => q.where('locale', locale));
    }

    return query.paginate(page, pageSize);
  }

  /**
   * Display a single resource
   */
  async show({ params, request, i18n }: HttpContext) {
    const locale = request.input('locale');
    const query = Franchise.query().where('id', params.id).withCount('games');

    if (locale === '*') {
      query.preload('translations');
    } else {
      query.preload('translations', (q) => q.where('locale', locale || i18n.locale));
    }

    return query.firstOrFail();
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    // Only admin and editor can create franchises
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const data = request.only(['name']);
    return Franchise.create(data);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth, response }: HttpContext) {
    // Only admin and editor can update franchises
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const franchise = await Franchise.findOrFail(params.id);
    const data = request.only(['name']);
    franchise.merge(data);
    return franchise.save();
  }
}
