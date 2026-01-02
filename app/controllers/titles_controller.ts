import Title from '#models/title';
import type { HttpContext } from '@adonisjs/core/http';

export default class TitlesController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 10);
    return Title.query()
      .preload('translations')
      .preload('games')
      .orderBy('name')
      .paginate(page, pageSize);
  }
}
