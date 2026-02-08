import Title from '#models/title';
import TitleTranslation from '#models/title_translation';
import {
  titleTranslationStoreValidator,
  titleTranslationUpdateValidator,
} from '#validators/title_translation_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class TitleTranslationsController {
  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    // Verify the title exists
    await Title.findOrFail(params.title_id);

    const { locale, name } = await request.validateUsing(titleTranslationStoreValidator);

    // Check if translation already exists for this locale
    const existingTranslation = await TitleTranslation.query()
      .where('titleId', params.title_id)
      .andWhere('locale', locale)
      .first();

    if (existingTranslation) {
      return response.badRequest({ message: 'Translation for this locale already exists' });
    }

    const translation = await TitleTranslation.create({
      titleId: params.title_id,
      locale,
      name,
    });

    return response.created(translation);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    // Verify the title exists
    await Title.findOrFail(params.title_id);

    const translation = await TitleTranslation.findOrFail(params.id);

    // Verify the translation belongs to the specified title
    if (translation.titleId !== Number(params.title_id)) {
      return response.badRequest({ error: 'Translation does not belong to the specified title' });
    }

    const data = await request.validateUsing(titleTranslationUpdateValidator);

    translation.merge(data);

    return await translation.save();
  }
}
