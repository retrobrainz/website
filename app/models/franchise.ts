import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import FranchiseTranslation from './franchise_translation.js';
import Game from './game.js';

export default class Franchise extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare duplicateId: number | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => Franchise, { foreignKey: 'duplicateId' })
  declare duplicate: BelongsTo<typeof Franchise>;

  @hasMany(() => FranchiseTranslation)
  declare translations: HasMany<typeof FranchiseTranslation>;

  @hasMany(() => Game)
  declare games: HasMany<typeof Game>;
}
