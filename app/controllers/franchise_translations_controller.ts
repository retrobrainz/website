import Franchise from '#models/franchise';
import FranchiseTranslation from '#models/franchise_translation';
import {
  franchiseTranslationStoreValidator,
  franchiseTranslationUpdateValidator,
} from '#validators/franchise_translation_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class FranchiseTranslationsController {
  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    // Verify the franchise exists
    await Franchise.findOrFail(params.franchise_id);

    const { locale, name } = await request.validateUsing(franchiseTranslationStoreValidator);

    // Check if translation already exists for this locale
    const existingTranslation = await FranchiseTranslation.query()
      .where('franchiseId', params.franchise_id)
      .andWhere('locale', locale)
      .first();

    if (existingTranslation) {
      return response.badRequest({ message: 'Translation for this locale already exists' });
    }

    const translation = await FranchiseTranslation.create({
      franchiseId: params.franchise_id,
      locale,
      name,
    });

    return response.created(translation);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    // Verify the franchise exists
    await Franchise.findOrFail(params.franchise_id);

    const translation = await FranchiseTranslation.findOrFail(params.id);

    // Verify the translation belongs to the specified franchise
    if (translation.franchiseId !== Number(params.franchise_id)) {
      return response.badRequest({
        error: 'Translation does not belong to the specified franchise',
      });
    }

    const payload = await request.validateUsing(franchiseTranslationUpdateValidator);
    translation.merge(payload);
    await translation.save();

    return response.ok(translation);
  }
}
