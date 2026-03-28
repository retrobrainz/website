import Language from '#models/language';
import { createLanguageValidator, updateLanguageValidator } from '#validators/language_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class LanguagesController {
  async index({ request }: HttpContext) {
    const search = request.input('search');
    const query = Language.query().orderBy('name', 'asc').withCount('games');

    if (search) {
      search
        .split(/\s+/)
        .filter(Boolean)
        .forEach((term: string) => {
          query.where((languageQuery) => {
            languageQuery.where('name', 'ilike', `%${term}%`).orWhere('code', 'ilike', `%${term}%`);
          });
        });
    }

    const platformId = request.input('platformId');
    const titleId = request.input('titleId');
    const franchiseId = request.input('franchiseId');
    const developerId = request.input('developerId');
    const publisherId = request.input('publisherId');
    if (platformId || titleId || franchiseId || developerId || publisherId) {
      query.whereHas('games', (gameQuery) => {
        if (platformId) {
          gameQuery.where('platformId', platformId);
        }
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
    return Language.query().where('id', params.id).withCount('games').firstOrFail();
  }

  async store({ request, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const payload = await request.validateUsing(createLanguageValidator);
    const language = await Language.create({
      ...payload,
      code: payload.code.toLowerCase(),
    });

    await language.refresh();

    return response.created(language);
  }

  async update({ params, request, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const language = await Language.findOrFail(params.id);
    const payload = await request.validateUsing(updateLanguageValidator);

    language.merge({
      ...payload,
      ...(payload.code ? { code: payload.code.toLowerCase() } : {}),
    });
    await language.save();
    await language.refresh();

    return language;
  }

  async destroy({ params, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const language = await Language.findOrFail(params.id);
    await language.delete();

    return response.noContent();
  }
}
