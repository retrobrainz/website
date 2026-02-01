import Genre from '#models/genre';
import GenreTranslation from '#models/genre_translation';
import {
  genreTranslationStoreValidator,
  genreTranslationUpdateValidator,
} from '#validators/genre_translation_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class GenreTranslationsController {
  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    // Verify the genre exists
    await Genre.findOrFail(params.genre_id);

    const { locale, name } = await request.validateUsing(genreTranslationStoreValidator);

    // Check if translation already exists for this locale
    const existingTranslation = await GenreTranslation.query()
      .where('genreId', params.genre_id)
      .andWhere('locale', locale)
      .first();

    if (existingTranslation) {
      return response.badRequest({ message: 'Translation for this locale already exists' });
    }

    const translation = await GenreTranslation.create({
      genreId: params.genre_id,
      locale,
      name,
    });

    return response.created(translation);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    // Verify the genre exists
    await Genre.findOrFail(params.genre_id);

    const translation = await GenreTranslation.findOrFail(params.id);

    // Verify the translation belongs to the specified genre
    if (translation.genreId !== Number(params.genre_id)) {
      return response.badRequest({ error: 'Translation does not belong to the specified genre' });
    }

    const data = await request.validateUsing(genreTranslationUpdateValidator);

    translation.merge(data);

    return await translation.save();
  }
}
