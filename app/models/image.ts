import drive from '@adonisjs/drive/services/main';
import { BaseModel, column, computed } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

export default class Image extends BaseModel {
  static storage = 'images';

  static async fromFs(path: string): Promise<Image> {
    const buffer = await readFile(path);
    return this.fromBuffer(buffer);
  }

  static async fromBuffer(buffer: Buffer): Promise<Image> {
    const hash = createHash('md5');
    const md5 = hash.update(buffer).digest('hex');

    const { width, height, format, size } = await sharp(buffer).metadata();

    const disk = drive.use();
    const image = await Image.firstOrCreate({
      width,
      height,
      format,
      size,
      md5,
    });

    if (!(await disk.exists(image.path))) {
      await disk.put(image.path, buffer);
    }

    return image;
  }

  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare format: string;

  @column()
  declare width: number;

  @column()
  declare height: number;

  @column()
  declare size: number;

  @column()
  declare md5: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  get path() {
    return `${Image.storage}/${this.md5}.${this.format}`;
  }

  @computed()
  get url() {
    return `/uploads/${this.path}`;
  }
}
