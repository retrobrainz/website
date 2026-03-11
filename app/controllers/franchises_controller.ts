import Franchise from '#models/franchise';
import { franchiseMergeValidator } from '#validators/franchise_merge_validator';
import type { HttpContext } from '@adonisjs/core/http';
import db from '@adonisjs/lucid/services/db';

export default class FranchisesController {
  /**
   * Display a list of resource
   */
  async index({ request, i18n }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 24);
    const locale = request.input('locale', i18n.locale);
    const search = request.input('search');

    const query = Franchise.query().withCount('titles').preload('icon');

    if (search) {
      search
        .split(' ')
        .filter(Boolean)
        .forEach((term: string) => {
          query.where('name', 'ilike', `%${term}%`);
        });
    }

    query.orderBy('titles_count', 'desc');

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
    const query = Franchise.query().where('id', params.id).withCount('titles').preload('icon');

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

    const data = request.only(['name', 'wikipedia', 'iconId']);
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
    const data = request.only(['name', 'wikipedia', 'iconId']);
    franchise.merge(data);
    return franchise.save();
  }

  /**
   * Delete the resource
   */
  async destroy({ params, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const franchise = await Franchise.findOrFail(params.id);
    await franchise.delete();
    return response.noContent();
  }

  async merge({ params, request, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const sourceFranchiseId = Number(params.id);
    const { targetFranchiseId } = await request.validateUsing(franchiseMergeValidator);

    if (sourceFranchiseId === targetFranchiseId) {
      return response.badRequest({ message: 'Source and target franchises must be different' });
    }

    await db.transaction(async (trx) => {
      await Franchise.query({ client: trx }).where('id', sourceFranchiseId).firstOrFail();
      await Franchise.query({ client: trx }).where('id', targetFranchiseId).firstOrFail();

      const titleRows = await trx
        .from('title_franchise')
        .where('franchise_id', sourceFranchiseId)
        .select('title_id');

      if (titleRows.length > 0) {
        await trx
          .table('title_franchise')
          .insert(
            titleRows.map((row) => ({
              title_id: row.title_id,
              franchise_id: targetFranchiseId,
            })),
          )
          .onConflict(['title_id', 'franchise_id'])
          .ignore();
      }

      await trx.from('franchises').where('id', sourceFranchiseId).delete();
    });

    const mergedFranchise = await Franchise.query().where('id', targetFranchiseId).firstOrFail();

    return mergedFranchise;
  }
}
