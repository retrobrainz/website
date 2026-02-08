import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Favorite from './favorite.js';
import Title from './title.js';

export default class TitleFavorite extends Favorite {
  @column()
  declare titleId: number;

  // Relationships

  @belongsTo(() => Title)
  declare title: BelongsTo<typeof Title>;
}
