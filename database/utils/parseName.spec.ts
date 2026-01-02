import { test } from '@japa/runner';
import parseName from './parseName.js';

test('parseName()', ({ assert }) => {
  assert.deepEqual(parseName('Greatest Striker (Japan)'), {
    title: 'Greatest Striker',
    displayName: 'Greatest Striker (Japan)',
    mainName: 'Greatest Striker (Japan)',
    disc: 1,
    region: 'Japan',
    language: undefined,
  });

  assert.deepEqual(parseName('Resident Evil 4 (Europe) (En,Fr,De,Es,It)'), {
    title: 'Resident Evil 4',
    displayName: 'Resident Evil 4 (Europe)',
    mainName: 'Resident Evil 4 (Europe) (En,Fr,De,Es,It)',
    disc: 1,
    region: 'Europe',
    language: 'En,Fr,De,Es,It',
  });

  assert.deepEqual(parseName('Space Channel 5 - Special Edition (USA) (Disc 2)'), {
    title: 'Space Channel 5 - Special Edition',
    displayName: 'Space Channel 5 - Special Edition (USA)',
    mainName: 'Space Channel 5 - Special Edition (USA) (Disc 1)',
    disc: 2,
    region: 'USA',
    language: undefined,
  });

  assert.deepEqual(parseName('Tomb Raider - The Last Revelation (USA) (Rev 1)'), {
    title: 'Tomb Raider - The Last Revelation',
    displayName: 'Tomb Raider - The Last Revelation (USA)',
    mainName: 'Tomb Raider - The Last Revelation (USA)',
    disc: 1,
    region: 'USA',
    language: undefined,
  });

  assert.deepEqual(parseName('Tekken 3 (Europe) (Alt)'), {
    title: 'Tekken 3',
    displayName: 'Tekken 3 (Europe)',
    mainName: 'Tekken 3 (Europe)',
    disc: 1,
    region: 'Europe',
    language: undefined,
  });

  assert.deepEqual(parseName('Legend of Dragoon, The (Europe) (Disc 1)'), {
    title: 'Legend of Dragoon, The',
    displayName: 'Legend of Dragoon, The (Europe)',
    mainName: 'Legend of Dragoon, The (Europe) (Disc 1)',
    disc: 1,
    region: 'Europe',
    language: undefined,
  });
});
