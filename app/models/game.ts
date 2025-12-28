import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import GameTranslation from './game_translation.js';
import Rom from './rom.js';

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare platform: string;

  @column()
  declare title: string;

  @column.date()
  declare releaseDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @hasMany(() => GameTranslation)
  declare translations: HasMany<typeof GameTranslation>;

  @hasMany(() => Rom)
  declare roms: HasMany<typeof Rom>;
}
