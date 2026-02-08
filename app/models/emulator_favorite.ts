import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Emulator from './emulator.js';
import Favorite from './favorite.js';

export default class EmulatorFavorite extends Favorite {
  @column()
  declare emulatorId: number;

  // Relationships

  @belongsTo(() => Emulator)
  declare emulator: BelongsTo<typeof Emulator>;
}
