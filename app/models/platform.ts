import { BaseModel, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Company from './company.js';
import Game from './game.js';

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

  @column.date()
  declare releaseDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relations

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;

  @hasMany(() => Game)
  declare games: HasMany<typeof Game>;

  // Virtuals

  @computed()
  get gamesCount(): number | null {
    return this.$extras.games_count ?? null;
  }
}
