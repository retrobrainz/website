import Game from '#models/game';
import type { HttpContext } from '@adonisjs/core/http';

export default class GameImagesController {
  async store({ params, request }: HttpContext) {
    // TODO: validate input
    const { game_id } = params;
    const game = await Game.findOrFail(game_id);
    return await game.related('images').firstOrCreate({
      gameId: game_id,
      imageId: request.input('imageId'),
      type: request.input('type'),
    });
  }
}
