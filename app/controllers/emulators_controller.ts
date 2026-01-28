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

    if (request.input('operatingSystemId')) {
      query.whereHas('operatingSystems', (q) => {
        q.where('operating_systems.id', request.input('operatingSystemId'));
      });
    }

    return query
      .preload('icon')
      .preload('operatingSystems')
      .preload('platforms')
      .preload('screenshot')
      .orderBy('name', 'asc')
      .exec();
  }

  async store({ request, auth, response }: HttpContext) {
    // Only editors and admins can create emulators
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return response.forbidden({ error: 'Unauthorized' });
    }

    // TODO validate input
    const {
      name,
      website,
      state,
      releaseDate,
      iconId,
      screenshotId,
      platformIds,
      operatingSystemIds,
    } = request.all();
    const emulator = await Emulator.create({
      name,
      website,
      state,
      releaseDate,
      iconId,
      screenshotId,
    });

    // Attach relationships if provided
    if (Array.isArray(platformIds)) {
      await emulator.related('platforms').attach(platformIds);
    }
    if (Array.isArray(operatingSystemIds)) {
      await emulator.related('operatingSystems').attach(operatingSystemIds);
    }

    // Load relationships before returning
    await emulator.load('icon');
    await emulator.load('screenshot');
    await emulator.load('platforms');
    await emulator.load('operatingSystems');

    return emulator;
  }

  async show({ params }: HttpContext) {
    const emulator = await Emulator.query()
      .where('id', params.id)
      .preload('icon')
      .preload('platforms')
      .preload('operatingSystems')
      .preload('screenshot')
      .firstOrFail();

    return emulator;
  }

  async update({ params, request, auth, response }: HttpContext) {
    // Only editors and admins can update emulators
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return response.forbidden({ error: 'Unauthorized' });
    }

    // TODO validate input
    const {
      name,
      website,
      state,
      releaseDate,
      iconId,
      screenshotId,
      platformIds,
      operatingSystemIds,
    } = request.all();
    const emulator = await Emulator.findOrFail(params.id);

    emulator.merge({ name, website, state, releaseDate, iconId, screenshotId });
    await emulator.save();

    // Sync relationships if provided
    if (Array.isArray(platformIds)) {
      await emulator.related('platforms').sync(platformIds);
    }
    if (Array.isArray(operatingSystemIds)) {
      await emulator.related('operatingSystems').sync(operatingSystemIds);
    }

    // Load relationships before returning
    await emulator.load('icon');
    await emulator.load('screenshot');
    await emulator.load('platforms');
    await emulator.load('operatingSystems');

    return emulator;
  }
}
