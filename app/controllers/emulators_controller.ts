import Emulator from '#models/emulator';
import type { HttpContext } from '@adonisjs/core/http';

export default class EmulatorsController {
  /**
   * Display a list of resources
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 10);
    const query = Emulator.query();

    if (request.input('platformId')) {
      query.whereHas('platforms', (q) => {
        q.where('platforms.id', request.input('platformId'));
      });
    }

    return query.orderBy('name', 'asc').paginate(page, pageSize);
  }

  async show({ params }: HttpContext) {
    const emulator = await Emulator.query()
      .where('id', params.id)
      .preload('platforms')
      .firstOrFail();

    return emulator;
  }
}
