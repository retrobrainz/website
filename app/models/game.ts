import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import GameTranslation from './game_translation.js';
import Platform from './platform.js';
import Rom from './rom.js';

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare platformId: number;

  @column()
  declare name: string;

  @column()
  declare region: string | null;

  @column()
  declare serial: string | null;

  @column()
  declare developer: string | null;

  @column()
  declare publisher: string | null;

  @column.date()
  declare releaseDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => Platform)
  declare platform: BelongsTo<typeof Platform>;

  @hasMany(() => GameTranslation)
  declare translations: HasMany<typeof GameTranslation>;

  @hasMany(() => Rom)
  declare roms: HasMany<typeof Rom>;
}
