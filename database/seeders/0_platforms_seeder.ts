import Company from '#models/company';
import Image from '#models/image';
import Platform from '#models/platform';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { sleep } from '@guoyunhe/sleep';
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
    for (const props of [
      {
        name: 'Nintendo Entertainment System',
        screenWidth: 256,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1983-07-15'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/NES_logo.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/NES-Console-Set.png',
      },
      {
        name: 'Family Computer Disk System',
        screenWidth: 256,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1986-02-21'),
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/c/c7/Family_Computer_Disk_System_logo.png',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/f/fe/Nintendo-Famicom-Disk-System.jpg',
      },
      {
        name: 'Game Boy',
        screenWidth: 160,
        screenHeight: 144,
        releaseDate: DateTime.fromISO('1989-04-21'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Nintendo_Game_Boy_Logo.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Game-Boy-FL.png',
      },
      {
        name: 'Super Nintendo Entertainment System',
        screenWidth: 256,
        screenHeight: 224,
        releaseDate: DateTime.fromISO('1990-11-21'),
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/3/33/Super_Nintendo_Entertainment_System_logo.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/SNES-Mod1-Console-Set.jpg',
      },
      {
        name: 'Nintendo 64',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1996-06-23'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2d/Nintendo_64_%28logo%29.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png',
      },
      {
        name: 'Game Boy Color',
        screenWidth: 160,
        screenHeight: 144,
        releaseDate: DateTime.fromISO('1998-10-21'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Game_Boy_Color_logo.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Nintendo_Game_Boy_Color.png',
      },
      {
        name: 'Game Boy Advance',
        screenWidth: 240,
        screenHeight: 160,
        releaseDate: DateTime.fromISO('2001-03-21'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Game_Boy_Advance_logo.svg',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/0/0b/Nintendo-Game-Boy-Advance-Purple-FL.png',
      },
      {
        name: 'GameCube',
        screenWidth: 640,
        screenHeight: 480,
        releaseDate: DateTime.fromISO('2001-09-14'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e6/Nintendo_Gamecube_Logo.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/GameCube-Console-Set.png',
      },
      {
        name: 'Nintendo DS',
        screenWidth: 256,
        screenHeight: 384,
        releaseDate: DateTime.fromISO('2004-11-21'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Nintendo_DS_Logo.svg',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/5/56/Nintendo-DS-Lite-Black-Open.png',
      },
      {
        name: 'Wii',
        screenWidth: 640,
        screenHeight: 480,
        releaseDate: DateTime.fromISO('2006-11-19'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Wii.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Wii-Console.png',
      },
      {
        name: 'Nintendo DSi',
        screenWidth: 256,
        screenHeight: 384,
        releaseDate: DateTime.fromISO('2008-11-01'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Nintendo_DSi_logo.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Nintendo-DSi-Bl-Open.png',
      },
      {
        name: 'Nintendo 3DS',
        screenWidth: 400,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('2011-02-26'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Nintendo_3DS_logo.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Nintendo-3DS-AquaOpen.png',
      },
      {
        name: 'Wii U',
        screenWidth: 1280,
        screenHeight: 720,
        releaseDate: DateTime.fromISO('2012-11-18'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/WiiU.svg',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/4a/Wii_U_Console_and_Gamepad.png',
      },
      {
        name: 'Switch',
        screenWidth: 1280,
        screenHeight: 720,
        releaseDate: DateTime.fromISO('2017-03-03'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Nintendo_Switch_logo.svg',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/8/88/Nintendo-Switch-wJoyCons-BlRd-Standing-FL.jpg',
      },
    ]) {
      await this.createPlatform({ companyId: nintendo.id, ...props });
    }

    // Sony consoles
    const sony = await Company.firstOrCreate({ name: 'Sony' });
    for (const props of [
      {
        name: 'PlayStation',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1994-12-03'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Playstation_logo_colour.svg',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/en/9/9e/PlayStation-SCPH-1000-with-Controller.png',
      },
      {
        name: 'PlayStation 2',
        screenWidth: 640,
        screenHeight: 480,
        releaseDate: DateTime.fromISO('2000-03-04'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/PlayStation_2_logo.svg',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sony-PlayStation-2-30001-wController-L.jpg',
      },
      {
        name: 'PlayStation Portable',
        screenWidth: 480,
        screenHeight: 272,
        releaseDate: DateTime.fromISO('2004-12-12'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/PSP_Logo.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Psp-1000.jpg',
      },
      {
        name: 'PlayStation 3',
        screenWidth: 1280,
        screenHeight: 720,
        releaseDate: DateTime.fromISO('2006-11-11'),
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/0/05/PlayStation_3_logo_%282009%29.svg',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg',
      },
      {
        name: 'PlayStation Vita',
        screenWidth: 960,
        screenHeight: 544,
        releaseDate: DateTime.fromISO('2011-12-17'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/PlayStation_Vita_logo.svg',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/b/b4/PlayStation-Vita-1101-FL.jpg',
      },
      {
        name: 'PlayStation 4',
        screenWidth: 1920,
        screenHeight: 1080,
        releaseDate: DateTime.fromISO('2013-11-15'),
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/8/87/PlayStation_4_logo_and_wordmark.svg',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/a/a6/Sony-PlayStation-4-wController.jpg',
      },
    ]) {
      await this.createPlatform({ companyId: sony.id, ...props });
    }

    // Sega consoles
    const sega = await Company.firstOrCreate({ name: 'Sega' });
    for (const props of [
      {
        name: 'Master System - Mark III',
        screenWidth: 256,
        screenHeight: 192,
        releaseDate: DateTime.fromISO('1985-10-20'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Sega-master-system-logo.png',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/f/f1/Sega-Master-System-MkII-wController.jpg',
      },
      {
        name: 'Mega Drive - Genesis',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1988-10-29'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/1/12/GenesisLogo.png',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/6/6a/Sega-Genesis-Mk2-6button.jpg',
      },
      {
        name: 'Game Gear',
        screenWidth: 160,
        screenHeight: 144,
        releaseDate: DateTime.fromISO('1990-10-06'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Game_Gear_logo_Sega.png',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Sega-Game-Gear-WB.png',
      },
      {
        name: 'Mega-CD - Sega CD',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1991-12-17'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Sega_CD_Logo.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Sega-CD-Model2-Set.jpg',
      },
      {
        name: '32X',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1994-11-21'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Sega_32X_logo.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Sega-Genesis-Model2-32X.jpg',
      },
      {
        name: 'Saturn',
        screenWidth: 320,
        screenHeight: 240,
        releaseDate: DateTime.fromISO('1994-11-22'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Sega_Saturn_USA_logo.svg',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/c/cb/Sega-Saturn-Console-Set-Mk2.png',
      },
      {
        name: 'Dreamcast',
        screenWidth: 640,
        screenHeight: 480,
        releaseDate: DateTime.fromISO('1999-11-27'),
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Dreamcast_logo_Japan.svg',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Dreamcast-Console-Set.png',
      },
    ]) {
      await this.createPlatform({ companyId: sega.id, ...props });
    }
  }

  async createPlatform({ companyId, name, logoUrl, photoUrl, ...rest }: any) {
    const logo = logoUrl
      ? await Image.fromHttp(logoUrl, { width: 512, height: 512, format: 'avif', fit: 'inside' })
      : null;
    const logoId = logo ? logo.id : null;

    await sleep(5000); // To avoid hitting request limits

    const photo = photoUrl
      ? await Image.fromHttp(photoUrl, { width: 1024, height: 768, format: 'avif', fit: 'contain' })
      : null;
    const photoId = photo ? photo.id : null;

    await sleep(5000); // To avoid hitting request limits

    const props = { logoId, photoId, ...rest };
    await Platform.firstOrCreate({ companyId, name }, props);
  }
}
