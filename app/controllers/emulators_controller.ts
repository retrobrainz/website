import Emulator from '#models/emulator';
import type { HttpContext } from '@adonisjs/core/http';

export default class EmulatorsController {
  /**
   * Display a list of resources
   */
  async index({ request }: HttpContext) {
    const query = Emulator.query();

    if (request.input('platformId')) {
      query.whereHas('platforms', (q) => {
        q.where('platforms.id', request.input('platformId'));
      });
    }

    return query.preload('icon').orderBy('name', 'asc').exec();
  }

  async store({ request, auth }: HttpContext) {
    // Only editors and admins can create emulators
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return { error: 'Unauthorized' };
    }

    // TODO validate input
    const { name, website, state, releaseDate } = request.all();
    const emulator = await Emulator.create({ name, website, state, releaseDate });

    return emulator;
  }

  async show({ params }: HttpContext) {
    const emulator = await Emulator.query()
      .where('id', params.id)
      .preload('platforms')
      .preload('icon')
      .firstOrFail();

    return emulator;
  }

  async update({ params, request, auth }: HttpContext) {
    // Only editors and admins can update emulators
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return { error: 'Unauthorized' };
    }

    // TODO validate input
    const { name, website, state, releaseDate } = request.all();
    const emulator = await Emulator.findOrFail(params.id);

    emulator.merge({ name, website, state, releaseDate });
    return await emulator.save();
  }
}
