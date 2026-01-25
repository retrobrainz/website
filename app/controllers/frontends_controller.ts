import Frontend from '#models/frontend';
import type { HttpContext } from '@adonisjs/core/http';

export default class FrontendsController {
  /**
   * Display a list of resources
   */
  async index({ request }: HttpContext) {
    const query = Frontend.query();

    if (request.input('emulatorId')) {
      query.whereHas('emulators', (q) => {
        q.where('emulators.id', request.input('emulatorId'));
      });
    }

    if (request.input('operatingSystemId')) {
      query.whereHas('operatingSystems', (q) => {
        q.where('operating_systems.id', request.input('operatingSystemId'));
      });
    }

    return query.preload('emulators').preload('operatingSystems').orderBy('name', 'asc').exec();
  }

  async store({ request, auth }: HttpContext) {
    // Only editors and admins can create frontends
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return { error: 'Unauthorized' };
    }

    // TODO validate input
    const { name, website } = request.all();
    const frontend = await Frontend.create({ name, website });

    return frontend;
  }

  async show({ params }: HttpContext) {
    const frontend = await Frontend.query()
      .where('id', params.id)
      .preload('emulators')
      .preload('operatingSystems')
      .firstOrFail();

    return frontend;
  }

  async update({ params, request, auth }: HttpContext) {
    // Only editors and admins can update frontends
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return { error: 'Unauthorized' };
    }

    // TODO validate input
    const { name, website } = request.all();
    const frontend = await Frontend.findOrFail(params.id);

    frontend.merge({ name, website });
    return await frontend.save();
  }
}
