import Title from '#models/title';
import type { HttpContext } from '@adonisjs/core/http';

export default class TitlesController {
  /**
   * Display a list of resource
   */
  async index({ request, i18n }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 20);
    const search = request.input('search');
    const platformId = request.input('platformId');
    const franchiseId = request.input('franchiseId');
    const genreId = request.input('genreId');

    const query = Title.query();

    if (search) {
      search
        .split(' ')
        .filter(Boolean)
        .forEach((term: string) => {
          query.where('name', 'ilike', `%${term}%`);
        });
    }

    if (platformId) {
      query.whereHas('platforms', (q) => {
        q.where('platforms.id', platformId);
      });
    }

    if (franchiseId) {
      query.whereHas('franchises', (q) => {
        q.where('franchises.id', franchiseId);
      });
    }

    if (genreId) {
      query.whereHas('genres', (q) => {
        q.where('genres.id', genreId);
      });
    }

    query
      .withCount('games')
      .preload('translations', (q) => q.where('locale', i18n.locale))
      .preload('platforms')
      .preload('franchises', (q) =>
        q.preload('translations', (qq) => qq.where('locale', i18n.locale)),
      )
      .preload('genres', (q) => q.preload('translations', (qq) => qq.where('locale', i18n.locale)));

    query.orderBy('name', 'asc');

    return query.paginate(page, pageSize);
  }

  /**
   * Display a single resource
   */
  async show({ params, i18n }: HttpContext) {
    return Title.query()
      .where('id', params.id)
      .preload('translations', (q) => q.where('locale', i18n.locale))
      .preload('franchises', (q) =>
        q.preload('translations', (qq) => qq.where('locale', i18n.locale)),
      )
      .preload('genres', (q) => q.preload('translations', (qq) => qq.where('locale', i18n.locale)))
      .firstOrFail();
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'wikipedia']);
    const title = await Title.create(data);
    return response.created(title);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const title = await Title.findOrFail(params.id);
    const data = request.only(['name', 'wikipedia']);
    title.merge(data);
    await title.save();
    return title;
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const title = await Title.findOrFail(params.id);
    await title.delete();
    return response.noContent();
  }
}
