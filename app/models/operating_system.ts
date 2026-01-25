import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm';
import type { ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Emulator from './emulator.js';
import Frontend from './frontend.js';

export default class OperatingSystem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare arch: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @manyToMany(() => Emulator, {
    pivotTable: 'emulator_operating_system',
  })
  declare emulators: ManyToMany<typeof Emulator>;

  @manyToMany(() => Frontend, {
    pivotTable: 'frontend_operating_system',
  })
  declare frontends: ManyToMany<typeof Frontend>;
}
