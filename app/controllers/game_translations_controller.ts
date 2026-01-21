import Game from '#models/game';
import GameTranslation from '#models/game_translation';
import {
  gameTranslationStoreValidator,
  gameTranslationUpdateValidator,
} from '#validators/game_translation_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class GameTranslationsController {
  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    // Verify the game exists
    await Game.findOrFail(params.game_id);

    const { locale, name } = await request.validateUsing(gameTranslationStoreValidator);

    const translation = await GameTranslation.create({
      gameId: params.game_id,
      locale,
      name,
    });

    return response.created(translation);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    // Verify the game exists
    await Game.findOrFail(params.game_id);

    const translation = await GameTranslation.findOrFail(params.id);

    const data = await request.validateUsing(gameTranslationUpdateValidator);

    translation.merge(data);

    return await translation.save();
  }
}
