import { BaseModel, belongsTo, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Emulator from './emulator.js';
import FrontendFavorite from './frontend_favorite.js';
import Image from './image.js';
import OperatingSystem from './operating_system.js';

export default class Frontend extends BaseModel {
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

  @manyToMany(() => Emulator, {
    pivotTable: 'frontend_emulator',
  })
  declare emulators: ManyToMany<typeof Emulator>;

  @manyToMany(() => OperatingSystem, {
    pivotTable: 'frontend_operating_system',
  })
  declare operatingSystems: ManyToMany<typeof OperatingSystem>;

  @hasMany(() => FrontendFavorite)
  declare favorites: HasMany<typeof FrontendFavorite>;

  // Virtuals

  @computed()
  get favoritesCount(): number | null {
    return this.$extras.favorites_count ?? null;
  }
}
