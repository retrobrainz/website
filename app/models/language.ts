import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
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
}
