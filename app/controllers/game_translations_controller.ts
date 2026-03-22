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
    const game = await Game.findOrFail(params.game_id);

    const { locale, name } = await request.validateUsing(gameTranslationStoreValidator);

    const translation = await GameTranslation.create({
      gameId: params.game_id,
      locale,
      name,
    });

    const sameNameGames = await Game.query()
      .where('name', game.name)
      .whereNot('id', game.id)
      .select('id');

    if (sameNameGames.length > 0) {
      await GameTranslation.updateOrCreateMany(
        ['gameId', 'locale'],
        sameNameGames.map((sameNameGame) => ({
          gameId: sameNameGame.id,
          locale,
          name,
        })),
      );
    }

    return response.created(translation);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    // Verify the game exists
    const game = await Game.findOrFail(params.game_id);

    const translation = await GameTranslation.findOrFail(params.id);

    // Verify the translation belongs to the specified game
    if (translation.gameId !== Number(params.game_id)) {
      return response.badRequest({ error: 'Translation does not belong to the specified game' });
    }

    const data = await request.validateUsing(gameTranslationUpdateValidator);

    translation.merge(data);
    await translation.save();

    const sameNameGames = await Game.query()
      .where('name', game.name)
      .whereNot('id', game.id)
      .select('id');

    if (sameNameGames.length > 0) {
      await GameTranslation.updateOrCreateMany(
        ['gameId', 'locale'],
        sameNameGames.map((sameNameGame) => ({
          gameId: sameNameGame.id,
          locale: translation.locale,
          name: translation.name,
        })),
      );
    }

    return translation;
  }
}
