import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Genre from './genre.js';
import Platform from './platform.js';
import Region from './region.js';
import Rom from './rom.js';
import Title from './title.js';

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare platformId: number;

  @column()
  declare titleId: number;

  @column()
  declare name: string;

  @column.date()
  declare releaseDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => Platform)
  declare platform: BelongsTo<typeof Platform>;

  @belongsTo(() => Title)
  declare title: BelongsTo<typeof Title>;

  @hasMany(() => Rom)
  declare roms: HasMany<typeof Rom>;

  @manyToMany(() => Region, {
    pivotTable: 'game_region',
  })
  declare regions: ManyToMany<typeof Region>;

  @manyToMany(() => Genre, {
    pivotTable: 'game_genre',
  })
  declare genres: ManyToMany<typeof Genre>;
}
