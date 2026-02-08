import Title from '#models/title';
import type { HttpContext } from '@adonisjs/core/http';

export default class TitlesController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 20);
    const search = request.input('search');

    const query = Title.query();

    if (search) {
      query.where('name', 'ilike', `%${search}%`);
    }

    query.orderBy('name', 'asc');

    return query.paginate(page, pageSize);
  }

  /**
   * Display a single resource
   */
  async show({ params }: HttpContext) {
    return Title.findOrFail(params.id);
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'duplicateId']);
    const title = await Title.create(data);
    return response.created(title);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const title = await Title.findOrFail(params.id);
    const data = request.only(['name', 'duplicateId']);
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
