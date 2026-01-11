import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import GenreTranslation from './genre_translation.js';

export default class Genre extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare parentId: number | null;

  @column()
  declare duplicateId: number | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => Genre, { foreignKey: 'duplicateId' })
  declare duplicate: BelongsTo<typeof Genre>;

  @hasMany(() => GenreTranslation)
  declare translations: HasMany<typeof GenreTranslation>;
}
