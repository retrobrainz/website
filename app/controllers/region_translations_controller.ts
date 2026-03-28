import Region from '#models/region';
import RegionTranslation from '#models/region_translation';
import {
  regionTranslationStoreValidator,
  regionTranslationUpdateValidator,
} from '#validators/region_translation_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class RegionTranslationsController {
  async store({ params, request, response }: HttpContext) {
    await Region.findOrFail(params.region_id);

    const { locale, name } = await request.validateUsing(regionTranslationStoreValidator);

    const existingTranslation = await RegionTranslation.query()
      .where('regionId', params.region_id)
      .andWhere('locale', locale)
      .first();

    if (existingTranslation) {
      return response.badRequest({ message: 'Translation for this locale already exists' });
    }

    const translation = await RegionTranslation.create({
      regionId: params.region_id,
      locale,
      name,
    });

    return response.created(translation);
  }

  async update({ params, request, response }: HttpContext) {
    await Region.findOrFail(params.region_id);

    const translation = await RegionTranslation.findOrFail(params.id);

    if (translation.regionId !== Number(params.region_id)) {
      return response.badRequest({ error: 'Translation does not belong to the specified region' });
    }

    const data = await request.validateUsing(regionTranslationUpdateValidator);

    translation.merge(data);

    return await translation.save();
  }
}
