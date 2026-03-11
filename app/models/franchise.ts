import FranchiseTranslation from '#models/franchise_translation';
import Image from '#models/image';
import Title from '#models/title';
import { BaseModel, belongsTo, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';

export default class Franchise extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare iconId: number | null;

  @column()
  declare name: string;

  @column()
  declare wikipedia: string | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => Image, { foreignKey: 'iconId' })
  declare icon: BelongsTo<typeof Image>;

  @hasMany(() => FranchiseTranslation)
  declare translations: HasMany<typeof FranchiseTranslation>;

  @manyToMany(() => Title, {
    pivotTable: 'title_franchise',
  })
  declare titles: ManyToMany<typeof Title>;

  // Computed properties

  @computed()
  get titlesCount(): number | null {
    return this.$extras.titles_count ?? null;
  }
}
