import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Favorite from './favorite.js';
import Game from './game.js';

export default class GameFavorite extends Favorite {
  @column()
  declare gameId: number;

  // Relationships

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;
}
