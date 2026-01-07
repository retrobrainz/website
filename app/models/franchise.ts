import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import FranchiseTranslation from './franchise_translation.js';
import Title from './title.js';

export default class Franchise extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @hasMany(() => FranchiseTranslation)
  declare translations: HasMany<typeof FranchiseTranslation>;

  @hasMany(() => Title)
  declare titles: HasMany<typeof Title>;
}
