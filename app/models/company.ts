import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare wikipedia: string | null;

  @column()
  declare parentId: number | null;

  @column.date()
  declare foundingDate: DateTime | null;

  @column.date()
  declare defunctDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @belongsTo(() => Company, { foreignKey: 'parentId' })
  declare parent: BelongsTo<typeof Company>;

  @hasMany(() => Company, { foreignKey: 'parentId' })
  declare children: HasMany<typeof Company>;
}
