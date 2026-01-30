import { BaseModel, belongsTo, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import EmulatorFavorite from './emulator_favorite.js';
import Frontend from './frontend.js';
import Image from './image.js';
import OperatingSystem from './operating_system.js';
import Platform from './platform.js';

export default class Emulator extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare iconId: number | null;

  @column()
  declare screenshotId: number | null;

  @column()
  declare website: string | null;

  @column()
  declare sourceCode: string | null;

  @column()
  declare state: string | null;

  @column.date()
  declare releaseDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => Image, {
    foreignKey: 'iconId',
  })
  declare icon: BelongsTo<typeof Image>;

  @belongsTo(() => Image, {
    foreignKey: 'screenshotId',
  })
  declare screenshot: BelongsTo<typeof Image>;

  @manyToMany(() => Platform, {
    pivotTable: 'platform_emulator',
  })
  declare platforms: ManyToMany<typeof Platform>;

  @manyToMany(() => OperatingSystem, {
    pivotTable: 'emulator_operating_system',
  })
  declare operatingSystems: ManyToMany<typeof OperatingSystem>;

  @manyToMany(() => Frontend, {
    pivotTable: 'frontend_emulator',
  })
  declare frontends: ManyToMany<typeof Frontend>;

  @hasMany(() => EmulatorFavorite)
  declare favorites: HasMany<typeof EmulatorFavorite>;

  // Virtuals

  @computed()
  get favoritesCount(): number | null {
    return this.$extras.favorites_count ?? null;
  }
}
