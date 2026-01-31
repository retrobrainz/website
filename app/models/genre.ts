import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Game from './game.js';
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

  @manyToMany(() => Game, {
    pivotTable: 'game_genre',
  })
  declare games: ManyToMany<typeof Game>;
}
