import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm';
import type { ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Platform from './platform.js';

export default class Emulator extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare website: string | null;

  @column()
  declare state: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relations

  @manyToMany(() => Platform, {
    pivotTable: 'platform_emulator',
  })
  declare platforms: ManyToMany<typeof Platform>;
}
