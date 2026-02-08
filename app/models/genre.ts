import { BaseModel, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import GenreTranslation from './genre_translation.js';
import Title from './title.js';

export default class Genre extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare parentId: number | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @hasMany(() => GenreTranslation)
  declare translations: HasMany<typeof GenreTranslation>;

  @manyToMany(() => Title, {
    pivotTable: 'title_genre',
  })
  declare titles: ManyToMany<typeof Title>;

  // Computed

  @computed()
  get titlesCount(): number | null {
    return this.$extras.titles_count ?? null;
  }
}
