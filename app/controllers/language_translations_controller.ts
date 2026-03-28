import Language from '#models/language';
import LanguageTranslation from '#models/language_translation';
import {
  languageTranslationStoreValidator,
  languageTranslationUpdateValidator,
} from '#validators/language_translation_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class LanguageTranslationsController {
  async store({ params, request, response }: HttpContext) {
    await Language.findOrFail(params.language_id);

    const { locale, name } = await request.validateUsing(languageTranslationStoreValidator);

    const existingTranslation = await LanguageTranslation.query()
      .where('languageId', params.language_id)
      .andWhere('locale', locale)
      .first();

    if (existingTranslation) {
      return response.badRequest({ message: 'Translation for this locale already exists' });
    }

    const translation = await LanguageTranslation.create({
      languageId: params.language_id,
      locale,
      name,
    });

    return response.created(translation);
  }

  async update({ params, request, response }: HttpContext) {
    await Language.findOrFail(params.language_id);

    const translation = await LanguageTranslation.findOrFail(params.id);

    if (translation.languageId !== Number(params.language_id)) {
      return response.badRequest({
        error: 'Translation does not belong to the specified language',
      });
    }

    const data = await request.validateUsing(languageTranslationUpdateValidator);

    translation.merge(data);

    return await translation.save();
  }
}
