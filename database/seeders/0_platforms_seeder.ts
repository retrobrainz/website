import Company from '#models/company';
import Image from '#models/image';
import Platform from '#models/platform';
import app from '@adonisjs/core/services/app';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { download } from '@guoyunhe/downloader';
import { DateTime } from 'luxon';
import { existsSync } from 'node:fs';

export default class extends BaseSeeder {
  /**
   * Exclude platforms that currently cannot be emulated.
   *
   * @see https://en.wikipedia.org/wiki/List_of_best-selling_game_consoles
   */
  async run() {
    if (!existsSync(app.tmpPath('seed-images-main'))) {
      await download(
        'https://github.com/retrobrainz/seed-images/archive/refs/heads/main.tar.gz',
        app.tmpPath(),
        { extract: true },
      );
    }
    // Nintendo consoles
    const nintendo = await Company.firstOrCreate({ name: 'Nintendo' });
    for (const props of [
      {
        name: 'Nintendo Entertainment System',
        abbr: 'NES',
        screenWidth: 256,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1983-07-15'),
      },
      {
        name: 'Family Computer Disk System',
        abbr: 'FDS',
        screenWidth: 256,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1986-02-21'),
      },
      {
        name: 'Game Boy',
        abbr: 'GB',
        screenWidth: 160,
        screenHeight: 144,
        releaseDate: DateTime.fromISO('1989-04-21'),
      },
      {
        name: 'Super Nintendo Entertainment System',
        abbr: 'SNES',
        screenWidth: 256,
        screenHeight: 224,
        releaseDate: DateTime.fromISO('1990-11-21'),
      },
      {
        name: 'Nintendo 64',
        abbr: 'N64',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1996-06-23'),
      },
      {
        name: 'Game Boy Color',
        abbr: 'GBC',
        screenWidth: 160,
        screenHeight: 144,
        releaseDate: DateTime.fromISO('1998-10-21'),
      },
      {
        name: 'Game Boy Advance',
        abbr: 'GBA',
        screenWidth: 240,
        screenHeight: 160,
        releaseDate: DateTime.fromISO('2001-03-21'),
      },
      {
        name: 'GameCube',
        abbr: 'GC',
        screenWidth: 640,
        screenHeight: 480,
        releaseDate: DateTime.fromISO('2001-09-14'),
      },
      {
        name: 'Nintendo DS',
        abbr: 'NDS',
        screenWidth: 256,
        screenHeight: 384,
        releaseDate: DateTime.fromISO('2004-11-21'),
      },
      {
        name: 'Wii',
        abbr: 'Wii',
        screenWidth: 640,
        screenHeight: 480,
        releaseDate: DateTime.fromISO('2006-11-19'),
      },
      {
        name: 'Nintendo DSi',
        abbr: 'DSi',
        screenWidth: 256,
        screenHeight: 384,
        releaseDate: DateTime.fromISO('2008-11-01'),
      },
      {
        name: 'Nintendo 3DS',
        abbr: '3DS',
        screenWidth: 400,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('2011-02-26'),
      },
      {
        name: 'Wii U',
        abbr: 'Wii U',
        screenWidth: 1280,
        screenHeight: 720,
        releaseDate: DateTime.fromISO('2012-11-18'),
      },
      {
        name: 'Switch',
        abbr: 'NS',
        screenWidth: 1280,
        screenHeight: 720,
        releaseDate: DateTime.fromISO('2017-03-03'),
      },
    ]) {
      await this.createPlatform({ companyId: nintendo.id, ...props });
    }

    // Sony consoles
    const sony = await Company.firstOrCreate({ name: 'Sony' });
    for (const props of [
      {
        name: 'PlayStation',
        abbr: 'PS1',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1994-12-03'),
      },
      {
        name: 'PlayStation 2',
        abbr: 'PS2',
        screenWidth: 640,
        screenHeight: 480,
        releaseDate: DateTime.fromISO('2000-03-04'),
      },
      {
        name: 'PlayStation Portable',
        abbr: 'PSP',
        screenWidth: 480,
        screenHeight: 272,
        releaseDate: DateTime.fromISO('2004-12-12'),
      },
      {
        name: 'PlayStation 3',
        abbr: 'PS3',
        screenWidth: 1280,
        screenHeight: 720,
        releaseDate: DateTime.fromISO('2006-11-11'),
      },
      {
        name: 'PlayStation Vita',
        abbr: 'PSV',
        screenWidth: 960,
        screenHeight: 544,
        releaseDate: DateTime.fromISO('2011-12-17'),
      },
      {
        name: 'PlayStation 4',
        abbr: 'PS4',
        screenWidth: 1920,
        screenHeight: 1080,
        releaseDate: DateTime.fromISO('2013-11-15'),
      },
    ]) {
      await this.createPlatform({ companyId: sony.id, ...props });
    }

    // Sega consoles
    const sega = await Company.firstOrCreate({ name: 'Sega' });
    for (const props of [
      {
        name: 'Master System - Mark III',
        abbr: 'SMS',
        screenWidth: 256,
        screenHeight: 192,
        releaseDate: DateTime.fromISO('1985-10-20'),
      },
      {
        name: 'Mega Drive - Genesis',
        abbr: 'MD',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1988-10-29'),
      },
      {
        name: 'Game Gear',
        abbr: 'GG',
        screenWidth: 160,
        screenHeight: 144,
        releaseDate: DateTime.fromISO('1990-10-06'),
      },
      {
        name: 'Mega-CD - Sega CD',
        abbr: 'MCD',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1991-12-17'),
      },
      {
        name: '32X',
        abbr: '32X',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1994-11-21'),
      },
      {
        name: 'Saturn',
        abbr: 'SAT',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1994-11-22'),
      },
      {
        name: 'Dreamcast',
        abbr: 'DC',
        screenWidth: 640,
        screenHeight: 480,
        releaseDate: DateTime.fromISO('1999-11-27'),
      },
    ]) {
      await this.createPlatform({ companyId: sega.id, ...props });
    }
  }

  async createPlatform({ companyId, name, ...rest }: any) {
    const platform = await Platform.firstOrCreate({ companyId, name }, rest);

    if (!platform.abbr && rest.abbr) {
      platform.abbr = rest.abbr;
    }

    if (!platform.logoId) {
      const logoPath = [
        app.tmpPath('seed-images-main', 'platform-logos', `${name}.png`),
        app.tmpPath('seed-images-main', 'platform-logos', `${name}.svg`),
      ].find(existsSync);
      if (logoPath) {
        const logo = await Image.fromFs(logoPath, {
          width: 512,
          height: 512,
          format: 'avif',
          fit: 'inside',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        });
        platform.logoId = logo.id;
      }
    }

    if (!platform.photoId) {
      const photoPath = app.tmpPath('seed-images-main', 'platform-photos', `${name}.png`);
      const photo = await Image.fromFs(photoPath, {
        width: 1280,
        height: 720,
        format: 'avif',
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      });
      platform.photoId = photo.id;
    }

    await platform.save();
  }
}
