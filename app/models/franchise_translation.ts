import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';

export default class FranchiseTranslation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare franchiseId: number;

  @column()
  declare locale: string;

  @column()
  declare name: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
