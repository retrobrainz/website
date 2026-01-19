import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Game from './game.js';
import LanguageTranslation from './language_translation.js';

export default class Language extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare code: string;

  @column()
  declare name: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @hasMany(() => LanguageTranslation)
  declare translations: HasMany<typeof LanguageTranslation>;

  @manyToMany(() => Game, { pivotTable: 'game_language' })
  declare games: ManyToMany<typeof Game>;
}
