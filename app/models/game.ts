import { BaseModel, belongsTo, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Company from './company.js';
import GameFavorite from './game_favorite.js';
import GameTranslation from './game_translation.js';
import Image from './image.js';
import Language from './language.js';
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
  declare titleId: number | null;

  @column()
  declare name: string;

  @column.date()
  declare releaseDate: DateTime | null;

  @column()
  declare esrbRating: string | null;

  @column()
  declare pegiRating: string | null;

  @column()
  declare boxartId: number | null;

  @column()
  declare logoId: number | null;

  @column()
  declare screenshotId: number | null;

  @column()
  declare titlescreenId: number | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => Platform)
  declare platform: BelongsTo<typeof Platform>;

  @belongsTo(() => Title)
  declare title: BelongsTo<typeof Title>;

  @belongsTo(() => Image, { foreignKey: 'boxartId' })
  declare boxart: BelongsTo<typeof Image>;

  @belongsTo(() => Image, { foreignKey: 'logoId' })
  declare logo: BelongsTo<typeof Image>;

  @belongsTo(() => Image, { foreignKey: 'screenshotId' })
  declare screenshot: BelongsTo<typeof Image>;

  @belongsTo(() => Image, { foreignKey: 'titlescreenId' })
  declare titlescreen: BelongsTo<typeof Image>;

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

  @manyToMany(() => Language, {
    pivotTable: 'game_language',
  })
  declare languages: ManyToMany<typeof Language>;

  @hasMany(() => GameFavorite)
  declare favorites: HasMany<typeof GameFavorite>;

  // Virtuals

  @computed()
  get favoritesCount(): number | null {
    return this.$extras.favorites_count ?? null;
  }
}
