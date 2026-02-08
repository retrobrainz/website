import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Favorite from './favorite.js';
import Frontend from './frontend.js';

export default class FrontendFavorite extends Favorite {
  @column()
  declare frontendId: number;

  // Relationships

  @belongsTo(() => Frontend)
  declare frontend: BelongsTo<typeof Frontend>;
}
