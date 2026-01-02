import { test } from '@japa/runner';
import parseName from './parseName.js';

test('parseName()', ({ assert }) => {
  assert.deepEqual(parseName('Greatest Striker (Japan)'), {
    title: 'Greatest Striker',
    name: 'Greatest Striker (Japan)',
    disc: 1,
    regions: ['Japan'],
    languages: undefined,
  });

  assert.deepEqual(parseName('Resident Evil 4 (Europe) (En,Fr,De,Es,It)'), {
    title: 'Resident Evil 4',
    name: 'Resident Evil 4 (Europe)',
    disc: 1,
    regions: ['Europe'],
    languages: 'En,Fr,De,Es,It',
  });

  assert.deepEqual(parseName('Space Channel 5 - Special Edition (USA) (Disc 2)'), {
    title: 'Space Channel 5 - Special Edition',
    name: 'Space Channel 5 - Special Edition (USA)',
    disc: 2,
    regions: ['USA'],
    languages: undefined,
  });

  assert.deepEqual(parseName('Tomb Raider - The Last Revelation (USA) (Rev 1)'), {
    title: 'Tomb Raider - The Last Revelation',
    name: 'Tomb Raider - The Last Revelation (USA)',
    disc: 1,
    regions: ['USA'],
    languages: undefined,
  });

  assert.deepEqual(parseName('Tekken 3 (Europe) (Alt)'), {
    title: 'Tekken 3',
    name: 'Tekken 3 (Europe)',
    disc: 1,
    regions: ['Europe'],
    languages: undefined,
  });

  assert.deepEqual(parseName('Legend of Dragoon, The (Europe) (Disc 1)'), {
    title: 'Legend of Dragoon, The',
    name: 'Legend of Dragoon, The (Europe)',
    disc: 1,
    regions: ['Europe'],
    languages: undefined,
  });

  assert.deepEqual(parseName('688 Attack Sub (USA, Europe)'), {
    title: '688 Attack Sub',
    name: '688 Attack Sub (USA, Europe)',
    disc: 1,
    regions: ['USA', 'Europe'],
    languages: undefined,
  });

  assert.deepEqual(parseName('Contra - Hard Corps (USA) (Contra Anniversary Collection)'), {
    title: 'Contra - Hard Corps',
    name: 'Contra - Hard Corps (USA) (Contra Anniversary Collection)',
    disc: 1,
    regions: ['USA'],
    languages: undefined,
  });
});
