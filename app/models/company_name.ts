import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Company from './company.js';

export default class CompanyName extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare companyId: number;

  @column()
  declare name: string;

  @column()
  declare abbr: string | null;

  @column.date()
  declare startDate: DateTime | null;

  @column.date()
  declare endDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;
}
