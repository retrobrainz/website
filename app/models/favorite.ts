import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Game from './game.js';
import User from './user.js';

export default class Favorite extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare userId: number;

  @column()
  declare gameId: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;
}
