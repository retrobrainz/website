import drive from '@adonisjs/drive/services/main';
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import User from './user.js';

interface ImageCreateOptions {
  userId?: number;
  width?: number;
  height?: number;
  fit?: keyof sharp.FitEnum;
  format?: keyof sharp.FormatEnum;
}

export default class Image extends BaseModel {
  static async fromFs(path: string, options: ImageCreateOptions = {}): Promise<Image> {
    const buffer = await readFile(path);
    return this.fromBuffer(buffer, options);
  }

  static async fromHttp(url: string, options: ImageCreateOptions = {}): Promise<Image> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return this.fromBuffer(buffer, options);
  }

  static async fromBuffer(buffer: Buffer, options: ImageCreateOptions = {}): Promise<Image> {
    const metadata = await sharp(buffer).metadata();
    let sharpInstance = sharp(buffer);
    if (options.width || options.height) {
      sharpInstance = sharpInstance.resize({
        width: options.width,
        height: options.height,
        fit: options.fit,
        withoutEnlargement: true,
      });
    }
    if (options.format && options.format !== metadata.format) {
      sharpInstance = sharpInstance.toFormat(options.format);
    }

    let outputBuffer = await sharpInstance.toBuffer();
    let outputMetadata = await sharp(outputBuffer).metadata();

    // Choose the smaller one between original and processed
    if (outputMetadata.size! >= metadata.size!) {
      outputMetadata = metadata;
      outputBuffer = buffer;
    }

    const { width, height, format, size } = outputMetadata;

    const hash = createHash('md5');
    const md5 = hash.update(outputBuffer).digest('hex');

    const disk = drive.use();
    const image = await Image.firstOrCreate(
      {
        width,
        height,
        // sharp uses 'heif' but we want 'avif' to be more specific
        format: format === 'heif' ? 'avif' : format,
        size,
        md5,
      },
      { userId: options.userId },
    );

    if (!(await disk.exists(image.path))) {
      await disk.put(image.path, outputBuffer);
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

  @column({
    // Otherwise AdonisJS mistakes column name to md_5
    columnName: 'md5',
  })
  declare md5: string;

  @column()
  declare userId: number | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relationships

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  // Virtuals

  get path() {
    return `images/${this.md5}`;
  }

  @computed()
  get url() {
    return `/uploads/${this.path}`;
  }
}
