import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Frontend from './frontend.js';
import User from './user.js';

export default class FrontendFavorite extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare userId: number;

  @column()
  declare frontendId: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @belongsTo(() => Frontend)
  declare frontend: BelongsTo<typeof Frontend>;
}
