import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Franchise from './franchise.js';
import Game from './game.js';
import Genre from './genre.js';
import TitleTranslation from './title_translation.js';

export default class Title extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare note: string | null;

  @column()
  declare duplicateId: number | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => Title, { foreignKey: 'duplicateId' })
  declare duplicate: BelongsTo<typeof Title>;

  @hasMany(() => TitleTranslation)
  declare translations: HasMany<typeof TitleTranslation>;

  @hasMany(() => Game)
  declare games: HasMany<typeof Game>;

  @manyToMany(() => Genre, {
    pivotTable: 'title_genre',
  })
  declare genres: ManyToMany<typeof Genre>;

  @manyToMany(() => Franchise, {
    pivotTable: 'title_franchise',
  })
  declare franchises: ManyToMany<typeof Franchise>;
}
