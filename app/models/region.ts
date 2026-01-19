import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Game from './game.js';
import RegionTranslation from './region_translation.js';

export default class Region extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @hasMany(() => RegionTranslation)
  declare translations: HasMany<typeof RegionTranslation>;

  @manyToMany(() => Game, { pivotTable: 'game_region' })
  declare games: ManyToMany<typeof Game>;
}
