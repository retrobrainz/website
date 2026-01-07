import Franchise from '#models/franchise';
import type { HttpContext } from '@adonisjs/core/http';

export default class FranchisesController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 10);
    return Franchise.query().preload('translations').orderBy('name').paginate(page, pageSize);
  }
}
