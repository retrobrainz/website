import Company from '#models/company';
import Platform from '#models/platform';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  /**
   * Exclude platforms that currently cannot be emulated.
   *
   * @see https://en.wikipedia.org/wiki/List_of_best-selling_game_consoles
   */
  async run() {
    // Nintendo consoles
    const nintendo = await Company.firstOrCreate({ name: 'Nintendo' });
    await Promise.all(
      [
        {
          name: 'Nintendo Entertainment System',
          screenWidth: 256,
          screenHeight: 240,
          releaseDate: DateTime.fromISO('1983-07-15'),
        },
        {
          name: 'Family Computer Disk System',
          screenWidth: 256,
          screenHeight: 240,
          releaseDate: DateTime.fromISO('1986-02-21'),
        },
        {
          name: 'Game Boy',
          screenWidth: 160,
          screenHeight: 144,
          releaseDate: DateTime.fromISO('1989-04-21'),
        },
        {
          name: 'Super Nintendo Entertainment System',
          screenWidth: 256,
          screenHeight: 224,
          releaseDate: DateTime.fromISO('1990-11-21'),
        },
        {
          name: 'Nintendo 64',
          screenWidth: 320,
          screenHeight: 240,
          releaseDate: DateTime.fromISO('1996-06-23'),
        },
        {
          name: 'Game Boy Color',
          screenWidth: 160,
          screenHeight: 144,
          releaseDate: DateTime.fromISO('1998-10-21'),
        },
        {
          name: 'Game Boy Advance',
          screenWidth: 240,
          screenHeight: 160,
          releaseDate: DateTime.fromISO('2001-03-21'),
        },
        {
          name: 'GameCube',
          screenWidth: 640,
          screenHeight: 480,
          releaseDate: DateTime.fromISO('2001-09-14'),
        },
        {
          name: 'Nintendo DS',
          screenWidth: 256,
          screenHeight: 384,
          releaseDate: DateTime.fromISO('2004-11-21'),
        },
        {
          name: 'Wii',
          screenWidth: 640,
          screenHeight: 480,
          releaseDate: DateTime.fromISO('2006-11-19'),
        },
        {
          name: 'Nintendo DSi',
          screenWidth: 256,
          screenHeight: 384,
          releaseDate: DateTime.fromISO('2008-11-01'),
        },
        {
          name: 'Nintendo 3DS',
          screenWidth: 400,
          screenHeight: 240,
          releaseDate: DateTime.fromISO('2011-02-26'),
        },
      ].map(({ name, ...props }) =>
        Platform.firstOrCreate({ companyId: nintendo.id, name }, props),
      ),
    );

    // Sony consoles
    const sony = await Company.firstOrCreate({ name: 'Sony' });
    await Promise.all(
      [
        {
          name: 'PlayStation',
          screenWidth: 320,
          screenHeight: 240,
          releaseDate: DateTime.fromISO('1994-12-03'),
        },
        {
          name: 'PlayStation 2',
          screenWidth: 640,
          screenHeight: 480,
          releaseDate: DateTime.fromISO('2000-03-04'),
        },
        {
          name: 'PlayStation Portable',
          screenWidth: 480,
          screenHeight: 272,
          releaseDate: DateTime.fromISO('2004-12-12'),
        },
        {
          name: 'PlayStation 3',
          screenWidth: 1280,
          screenHeight: 720,
          releaseDate: DateTime.fromISO('2006-11-11'),
        },
        {
          name: 'PlayStation Vita',
          screenWidth: 960,
          screenHeight: 544,
          releaseDate: DateTime.fromISO('2011-12-17'),
        },
      ].map(({ name, ...props }) => Platform.firstOrCreate({ companyId: sony.id, name }, props)),
    );

    // Sega consoles
    const sega = await Company.firstOrCreate({ name: 'Sega' });
    await Promise.all(
      [
        {
          name: 'Master System - Mark III',
          screenWidth: 256,
          screenHeight: 192,
          releaseDate: DateTime.fromISO('1985-10-20'),
        },
        {
          name: 'Mega Drive - Genesis',
          screenWidth: 320,
          screenHeight: 240,
          releaseDate: DateTime.fromISO('1988-10-29'),
        },
        {
          name: 'Game Gear',
          screenWidth: 160,
          screenHeight: 144,
          releaseDate: DateTime.fromISO('1990-10-06'),
        },
        {
          name: 'Mega-CD - Sega CD',
          screenWidth: 320,
          screenHeight: 240,
          releaseDate: DateTime.fromISO('1991-12-17'),
        },
        {
          name: '32X',
          screenWidth: 320,
          screenHeight: 240,
          releaseDate: DateTime.fromISO('1994-11-21'),
        },
        {
          name: 'Saturn',
          screenWidth: 320,
          screenHeight: 240,
          releaseDate: DateTime.fromISO('1994-11-22'),
        },
        {
          name: 'Dreamcast',
          screenWidth: 640,
          screenHeight: 480,
          releaseDate: DateTime.fromISO('1999-11-27'),
        },
      ].map(({ name, ...props }) => Platform.firstOrCreate({ companyId: sega.id, name }, props)),
    );
  }
}
