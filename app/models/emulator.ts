import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Image from './image.js';
import Platform from './platform.js';

export default class Emulator extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare iconId: number | null;

  @column()
  declare website: string | null;

  @column()
  declare state: string;

  @column.date()
  declare releaseDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => Image)
  declare icon: BelongsTo<typeof Image>;

  @manyToMany(() => Platform, {
    pivotTable: 'platform_emulator',
  })
  declare platforms: ManyToMany<typeof Platform>;
}
