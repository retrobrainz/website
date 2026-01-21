import { BaseModel, belongsTo, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Company from './company.js';
import Favorite from './favorite.js';
import Franchise from './franchise.js';
import GameTranslation from './game_translation.js';
import Genre from './genre.js';
import Image from './image.js';
import Language from './language.js';
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

  @hasMany(() => GameTranslation)
  declare translations: HasMany<typeof GameTranslation>;

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

  @manyToMany(() => Language, {
    pivotTable: 'game_language',
  })
  declare languages: ManyToMany<typeof Language>;

  @hasMany(() => Favorite)
  declare favorites: HasMany<typeof Favorite>;

  // Virtuals

  @computed()
  get favoritesCount(): number | null {
    return this.$extras.favorites_count ?? null;
  }
}
