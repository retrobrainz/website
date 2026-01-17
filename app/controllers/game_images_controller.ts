import GameImage from '#models/game_image';
import type { HttpContext } from '@adonisjs/core/http';

export default class GameImagesController {
  async store({ params, request }: HttpContext) {
    // TODO: validate input
    const { game_id } = params;
    return await GameImage.firstOrCreate(
      {
        gameId: game_id,
        imageId: request.input('imageId'),
      },
      { type: request.input('type') },
    );
  }
}
