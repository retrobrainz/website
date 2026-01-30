import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
import { compose } from '@adonisjs/core/helpers';
import hash from '@adonisjs/core/services/hash';
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import EmulatorFavorite from './emulator_favorite.js';
import Favorite from './favorite.js';
import FrontendFavorite from './frontend_favorite.js';
import Image from './image.js';

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email', 'username'],
  passwordColumnName: 'password',
});

export default class User extends compose(BaseModel, AuthFinder) {
  static accessTokens = DbAccessTokensProvider.forModel(User);

  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare username: string;

  @column({ serializeAs: null })
  declare email: string;

  @column({ serializeAs: null })
  declare password: string;

  @column()
  declare role: string;

  @column()
  declare avatarId: number | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  // Relationships

  @belongsTo(() => Image, { foreignKey: 'avatarId' })
  declare avatar: BelongsTo<typeof Image>;

  @hasMany(() => Favorite)
  declare favorites: HasMany<typeof Favorite>;

  @hasMany(() => EmulatorFavorite)
  declare emulatorFavorites: HasMany<typeof EmulatorFavorite>;

  @hasMany(() => FrontendFavorite)
  declare frontendFavorites: HasMany<typeof FrontendFavorite>;
}
