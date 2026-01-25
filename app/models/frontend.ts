import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm';
import type { ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Emulator from './emulator.js';
import OperatingSystem from './operating_system.js';

export default class Frontend extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare website: string | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @manyToMany(() => Emulator, {
    pivotTable: 'emulator_frontend',
  })
  declare emulators: ManyToMany<typeof Emulator>;

  @manyToMany(() => OperatingSystem, {
    pivotTable: 'frontend_operating_system',
  })
  declare operatingSystems: ManyToMany<typeof OperatingSystem>;
}
