import Franchise from '#models/franchise';
import Game from '#models/game';
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';

export default class Title extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @hasMany(() => Game, { foreignKey: 'titleId' })
  declare games: HasMany<typeof Game>;

  @manyToMany(() => Franchise, {
    pivotTable: 'title_franchise',
  })
  declare franchises: ManyToMany<typeof Franchise>;
}
