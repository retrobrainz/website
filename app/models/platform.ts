import { BaseModel, belongsTo, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Company from './company.js';
import Emulator from './emulator.js';
import Game from './game.js';
import Image from './image.js';

export default class Platform extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare companyId: number | null;

  @column()
  declare screenWidth: number;

  @column()
  declare screenHeight: number;

  @column()
  declare logoId: number | null;

  @column.date()
  declare releaseDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relations

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;

  @belongsTo(() => Image, { foreignKey: 'logoId' })
  declare logo: BelongsTo<typeof Image>;

  @hasMany(() => Game)
  declare games: HasMany<typeof Game>;

  @manyToMany(() => Emulator, {
    pivotTable: 'platform_emulator',
  })
  declare emulators: ManyToMany<typeof Emulator>;

  // Virtuals

  @computed()
  get gamesCount(): number | null {
    return this.$extras.games_count ?? null;
  }
}
