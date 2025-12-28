import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';

export default class Rom extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare gameId: number;

  @column()
  declare name: string;

  @column()
  declare size: number | null;

  @column()
  declare crc: string | null;

  @column()
  declare md5: string | null;

  @column()
  declare sha1: string | null;

  @column()
  declare serial: string | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
