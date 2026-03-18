import { deleteGithubRepo, downloadGithubRepo } from '#utils/github';
import { BaseModel, belongsTo, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import { existsSync } from 'fs';
import { DateTime } from 'luxon';
import Company from './company.js';
import Emulator from './emulator.js';
import Game from './game.js';
import Image from './image.js';

export default class Platform extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare companyId: number | null;

  @column()
  declare screenWidth: number;

  @column()
  declare screenHeight: number;

  @column()
  declare logoId: number | null;

  @column()
  declare photoId: number | null;

  @column.date()
  declare releaseDate: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relations

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;

  @belongsTo(() => Image, { foreignKey: 'logoId' })
  declare logo: BelongsTo<typeof Image>;

  @belongsTo(() => Image, { foreignKey: 'photoId' })
  declare photo: BelongsTo<typeof Image>;

  @hasMany(() => Game)
  declare games: HasMany<typeof Game>;

  @manyToMany(() => Emulator, {
    pivotTable: 'platform_emulator',
  })
  declare emulators: ManyToMany<typeof Emulator>;

  // Virtuals

  @computed()
  get gamesCount(): number | null {
    return this.$extras.games_count ?? null;
  }

  // Libretro import

  async downloadThumbnails(): Promise<void> {
    const repo = `${this.company.name} - ${this.name}`.replaceAll(' ', '_');
    await downloadGithubRepo('libretro-thumbnails', repo);
  }

  async deleteThumbnails(): Promise<void> {
    const repo = `${this.company.name} - ${this.name}`.replaceAll(' ', '_');
    await deleteGithubRepo(repo);
  }

  async importGameImage(
    game: Game,
    romName: string,
    type: 'boxartId' | 'logoId' | 'screenshotId' | 'titlescreenId',
    folder: string,
  ): Promise<void> {
    const repo = `${this.company.name} - ${this.name}`.replaceAll(' ', '_');
    // special characters in image names are replaced with underscores
    const filename = `${romName.replace(/[&*/:`<>?\\|"]/g, '_')}.png`;

    const imagePath = `${process.cwd()}/tmp/${repo}-master/${folder}/${filename}`;

    if (!game[type] && existsSync(imagePath)) {
      try {
        const image = await Image.fromFs(imagePath);
        game[type] = image.id;
        await game.save();
      } catch {
        //
      }
    }
  }
}
