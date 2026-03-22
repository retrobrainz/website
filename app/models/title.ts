import Franchise from '#models/franchise';
import Game from '#models/game';
import Genre from '#models/genre';
import TitleFavorite from '#models/title_favorite';
import TitleTranslation from '#models/title_translation';
import { BaseModel, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Platform from './platform.js';

export default class Title extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare wikipedia: string | null;

  @column()
  declare mobygames: string | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @hasMany(() => Game, { foreignKey: 'titleId' })
  declare games: HasMany<typeof Game>;

  @hasMany(() => TitleTranslation)
  declare translations: HasMany<typeof TitleTranslation>;

  @hasMany(() => TitleFavorite)
  declare favorites: HasMany<typeof TitleFavorite>;

  @manyToMany(() => Platform, {
    pivotTable: 'games',
  })
  declare platforms: ManyToMany<typeof Platform>;

  @manyToMany(() => Franchise, {
    pivotTable: 'title_franchise',
  })
  declare franchises: ManyToMany<typeof Franchise>;

  @manyToMany(() => Genre, {
    pivotTable: 'title_genre',
  })
  declare genres: ManyToMany<typeof Genre>;

  // Computed properties

  @computed()
  get gamesCount(): number | null {
    return this.$extras.games_count ?? null;
  }

  @computed()
  get releaseDate(): DateTime | null {
    const aggregatedReleaseDate = this.$extras.release_date;

    if (aggregatedReleaseDate instanceof Date) {
      return DateTime.fromJSDate(aggregatedReleaseDate);
    }

    if (typeof aggregatedReleaseDate === 'string') {
      const parsedReleaseDate = DateTime.fromISO(aggregatedReleaseDate);
      return parsedReleaseDate.isValid ? parsedReleaseDate : null;
    }

    const loadedGames = Array.isArray(this.$preloaded.games)
      ? (this.$preloaded.games as Game[])
      : null;

    if (!loadedGames?.length) {
      return null;
    }

    return loadedGames.reduce<DateTime | null>((earliestReleaseDate, game) => {
      if (!game.releaseDate) {
        return earliestReleaseDate;
      }

      if (!earliestReleaseDate || game.releaseDate.toMillis() < earliestReleaseDate.toMillis()) {
        return game.releaseDate;
      }

      return earliestReleaseDate;
    }, null);
  }
}
