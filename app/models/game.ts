import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Company from './company.js';
import Franchise from './franchise.js';
import Genre from './genre.js';
import Image from './image.js';
import Platform from './platform.js';
import Region from './region.js';
import Rom from './rom.js';

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare platformId: number;

  @column()
  declare name: string;

  @column()
  declare languages: string | null;

  @column.date()
  declare releaseDate: DateTime | null;

  @column()
  declare esrbRating: string | null;

  @column()
  declare pegiRating: string | null;

  @column()
  declare duplicateId: number | null;

  @column()
  declare boxartId: number | null;

  @column()
  declare logoId: number | null;

  @column()
  declare snapId: number | null;

  @column()
  declare titleId: number | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => Platform)
  declare platform: BelongsTo<typeof Platform>;

  @belongsTo(() => Game, { foreignKey: 'duplicateId' })
  declare duplicate: BelongsTo<typeof Game>;

  @belongsTo(() => Image, { foreignKey: 'boxartId' })
  declare boxart: BelongsTo<typeof Image>;

  @belongsTo(() => Image, { foreignKey: 'logoId' })
  declare logo: BelongsTo<typeof Image>;

  @belongsTo(() => Image, { foreignKey: 'snapId' })
  declare snap: BelongsTo<typeof Image>;

  @belongsTo(() => Image, { foreignKey: 'titleId' })
  declare title: BelongsTo<typeof Image>;

  @hasMany(() => Rom)
  declare roms: HasMany<typeof Rom>;

  @manyToMany(() => Company, {
    pivotTable: 'game_developer',
  })
  declare developers: ManyToMany<typeof Company>;

  @manyToMany(() => Company, {
    pivotTable: 'game_publisher',
  })
  declare publishers: ManyToMany<typeof Company>;

  @manyToMany(() => Region, {
    pivotTable: 'game_region',
  })
  declare regions: ManyToMany<typeof Region>;

  @manyToMany(() => Genre, {
    pivotTable: 'game_genre',
  })
  declare genres: ManyToMany<typeof Genre>;

  @manyToMany(() => Franchise, {
    pivotTable: 'game_franchise',
  })
  declare franchises: ManyToMany<typeof Franchise>;
}
