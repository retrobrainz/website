import Region from '#models/region';
import { createRegionValidator, updateRegionValidator } from '#validators/region_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class RegionsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const search = request.input('search');
    const query = Region.query().orderBy('name', 'asc').withCount('games');

    if (search) {
      search
        .split(/\s+/)
        .filter(Boolean)
        .forEach((term: string) => {
          query.where('name', 'ilike', `%${term}%`);
        });
    }

    if (request.input('platformId')) {
      query.whereHas('games', (gameQuery) => {
        gameQuery.where('platformId', request.input('platformId'));
      });
    }

    const titleId = request.input('titleId');
    const franchiseId = request.input('franchiseId');
    const developerId = request.input('developerId');
    const publisherId = request.input('publisherId');
    if (titleId || franchiseId || developerId || publisherId) {
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

  async show({ params }: HttpContext) {
    return Region.query().where('id', params.id).withCount('games').firstOrFail();
  }

  async store({ request, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const payload = await request.validateUsing(createRegionValidator);
    const region = await Region.create(payload);

    await region.refresh();

    return response.created(region);
  }

  async update({ params, request, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const region = await Region.findOrFail(params.id);
    const payload = await request.validateUsing(updateRegionValidator);

    region.merge(payload);
    await region.save();
    await region.refresh();

    return region;
  }

  async destroy({ params, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const region = await Region.findOrFail(params.id);
    await region.delete();

    return response.noContent();
  }
}
