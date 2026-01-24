import Emulator from '#models/emulator';
import Platform from '#models/platform';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  async run() {
    // PCSX2 - PlayStation 2 emulator
    const pcsx2 = await Emulator.firstOrCreate(
      { name: 'PCSX2' },
      {
        name: 'PCSX2',
        website: 'https://pcsx2.net',
        state: 'stable',
        releaseDate: DateTime.fromISO('2002-09-22'),
      },
    );
    const ps2Platform = await Platform.findBy('name', 'PlayStation 2');
    if (ps2Platform) {
      await pcsx2.related('platforms').sync([ps2Platform.id]);
    }

    // RPCS3 - PlayStation 3 emulator
    const rpcs3 = await Emulator.firstOrCreate(
      { name: 'RPCS3' },
      {
        name: 'RPCS3',
        website: 'https://rpcs3.net',
        state: 'stable',
        releaseDate: DateTime.fromISO('2011-05-23'),
      },
    );
    const ps3Platform = await Platform.findBy('name', 'PlayStation 3');
    if (ps3Platform) {
      await rpcs3.related('platforms').sync([ps3Platform.id]);
    }

    // Eden - PlayStation Vita emulator
    const eden = await Emulator.firstOrCreate(
      { name: 'Eden' },
      {
        name: 'Eden',
        website: null,
        state: 'experimental',
        releaseDate: null,
      },
    );
    const psVitaPlatform = await Platform.findBy('name', 'PlayStation Vita');
    if (psVitaPlatform) {
      await eden.related('platforms').sync([psVitaPlatform.id]);
    }

    // Citra - Nintendo 3DS emulator
    const citra = await Emulator.firstOrCreate(
      { name: 'Citra' },
      {
        name: 'Citra',
        website: 'https://citra-emu.org',
        state: 'stable',
        releaseDate: DateTime.fromISO('2015-10-04'),
      },
    );
    const n3dsPlatform = await Platform.findBy('name', 'Nintendo 3DS');
    if (n3dsPlatform) {
      await citra.related('platforms').sync([n3dsPlatform.id]);
    }

    // Dolphin - GameCube and Wii emulator
    const dolphin = await Emulator.firstOrCreate(
      { name: 'Dolphin' },
      {
        name: 'Dolphin',
        website: 'https://dolphin-emu.org',
        state: 'stable',
        releaseDate: DateTime.fromISO('2003-09-22'),
      },
    );
    const gameCubePlatform = await Platform.findBy('name', 'GameCube');
    const wiiPlatform = await Platform.findBy('name', 'Wii');
    const platformIds: number[] = [];
    if (gameCubePlatform) platformIds.push(gameCubePlatform.id);
    if (wiiPlatform) platformIds.push(wiiPlatform.id);
    if (platformIds.length > 0) {
      await dolphin.related('platforms').sync(platformIds);
    }
  }
}
