import Platform from '#models/platform';
import { createPlatformValidator, updatePlatformValidator } from '#validators/platform_validator';
import type { HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';

export default class PlatformsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const query = Platform.query()
      .orderBy('name', 'asc')
      .preload('company')
      .preload('logo')
      .preload('photo')
      .withCount('games');

    const franchiseId = request.input('franchiseId');
    const titleId = request.input('titleId');
    const developerId = request.input('developerId');
    const publisherId = request.input('publisherId');
    if (franchiseId || titleId || developerId || publisherId) {
      query.whereHas('games', (gameQuery) => {
        if (titleId) {
          gameQuery.where('titleId', titleId);
        }
        if (franchiseId) {
          gameQuery.whereHas('title', (titleQuery) => {
            titleQuery.whereHas('franchises', (franchiseQuery) => {
              franchiseQuery.where('franchises.id', franchiseId);
            });
          });
        }
        if (developerId) {
          gameQuery.whereHas('developers', (developerQuery) => {
            developerQuery.where('companies.id', developerId);
          });
        }
        if (publisherId) {
          gameQuery.whereHas('publishers', (publisherQuery) => {
            publisherQuery.where('companies.id', publisherId);
          });
        }
      });
    }

    return query.exec();
  }

  async show({ params }: { params: { id: string } }) {
    const platform = await Platform.query()
      .where('id', params.id)
      .preload('company')
      .preload('emulators')
      .preload('logo')
      .preload('photo')
      .firstOrFail();

    return platform;
  }

  async store({ request, auth, response }: HttpContext) {
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const { emulatorIds, releaseDate, ...payload } =
      await request.validateUsing(createPlatformValidator);

    const platform = await Platform.create({
      ...payload,
      releaseDate: releaseDate ? DateTime.fromISO(releaseDate) : null,
    });

    if (Array.isArray(emulatorIds)) {
      await platform.related('emulators').attach(emulatorIds);
    }

    await platform.load('company');
    await platform.load('logo');
    await platform.load('photo');
    await platform.load('emulators');

    return response.created(platform);
  }

  async update({ params, request, auth, response }: HttpContext) {
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const { emulatorIds, releaseDate, ...payload } =
      await request.validateUsing(updatePlatformValidator);

    const platform = await Platform.findOrFail(params.id);

    platform.merge({
      ...payload,
      ...(releaseDate !== undefined
        ? { releaseDate: releaseDate ? DateTime.fromISO(releaseDate) : null }
        : {}),
    });
    await platform.save();

    if (Array.isArray(emulatorIds)) {
      await platform.related('emulators').sync(emulatorIds);
    }

    await platform.load('company');
    await platform.load('logo');
    await platform.load('photo');
    await platform.load('emulators');

    return platform;
  }
}
