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

    return query
      .preload('icon')
      .preload('screenshot')
      .preload('emulators')
      .preload('operatingSystems')
      .orderBy('name', 'asc')
      .exec();
  }

  async store({ request, auth, response }: HttpContext) {
    // Only editors and admins can create frontends
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    // TODO validate input
    const { name, website, iconId, screenshotId, emulatorIds, operatingSystemIds } = request.all();
    const frontend = await Frontend.create({
      name,
      website,
      iconId,
      screenshotId,
    });

    // Attach relationships if provided
    if (Array.isArray(emulatorIds)) {
      await frontend.related('emulators').attach(emulatorIds);
    }
    if (Array.isArray(operatingSystemIds)) {
      await frontend.related('operatingSystems').attach(operatingSystemIds);
    }

    // Load relationships before returning
    await frontend.load('icon');
    await frontend.load('screenshot');
    await frontend.load('emulators');
    await frontend.load('operatingSystems');

    return frontend;
  }

  async show({ params }: HttpContext) {
    const frontend = await Frontend.query()
      .where('id', params.id)
      .preload('icon')
      .preload('screenshot')
      .preload('emulators')
      .preload('operatingSystems')
      .firstOrFail();

    return frontend;
  }

  async update({ params, request, auth, response }: HttpContext) {
    // Only editors and admins can update frontends
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    // TODO validate input
    const { name, website, iconId, screenshotId, emulatorIds, operatingSystemIds } = request.all();
    const frontend = await Frontend.findOrFail(params.id);

    frontend.merge({ name, website, iconId, screenshotId });
    await frontend.save();

    // Sync relationships if provided
    if (Array.isArray(emulatorIds)) {
      await frontend.related('emulators').sync(emulatorIds);
    }
    if (Array.isArray(operatingSystemIds)) {
      await frontend.related('operatingSystems').sync(operatingSystemIds);
    }

    // Load relationships before returning
    await frontend.load('icon');
    await frontend.load('screenshot');
    await frontend.load('emulators');
    await frontend.load('operatingSystems');

    return frontend;
  }
}
