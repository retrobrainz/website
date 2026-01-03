import { test } from '@japa/runner';
import parseName from './parseName.js';

test('parseName()', ({ assert }) => {
  assert.deepEqual(parseName('Greatest Striker (Japan)'), {
    title: 'Greatest Striker',
    name: 'Greatest Striker (Japan)',
    disc: null,
    regions: ['Japan'],
    languages: undefined,
    tags: ['Japan'],
  });

  assert.deepEqual(parseName('Resident Evil 4 (Europe) (En,Fr,De,Es,It)'), {
    title: 'Resident Evil 4',
    name: 'Resident Evil 4 (Europe) (En,Fr,De,Es,It)',
    disc: null,
    regions: ['Europe'],
    languages: 'En,Fr,De,Es,It',
    tags: ['Europe', 'En,Fr,De,Es,It'],
  });

  assert.deepEqual(parseName('Space Channel 5 - Special Edition (USA) (Disc 2)'), {
    title: 'Space Channel 5 - Special Edition',
    name: 'Space Channel 5 - Special Edition (USA)',
    disc: 2,
    regions: ['USA'],
    languages: undefined,
    tags: ['USA', 'Disc 2'],
  });

  assert.deepEqual(parseName('Tomb Raider - The Last Revelation (USA) (Rev 1)'), {
    title: 'Tomb Raider - The Last Revelation',
    name: 'Tomb Raider - The Last Revelation (USA)',
    disc: null,
    regions: ['USA'],
    languages: undefined,
    tags: ['USA', 'Rev 1'],
  });

  assert.deepEqual(parseName('Tekken 3 (Europe) (Alt)'), {
    title: 'Tekken 3',
    name: 'Tekken 3 (Europe)',
    disc: null,
    regions: ['Europe'],
    languages: undefined,
    tags: ['Europe', 'Alt'],
  });

  assert.deepEqual(parseName('Legend of Dragoon, The (Europe) (Disc 1)'), {
    title: 'Legend of Dragoon, The',
    name: 'Legend of Dragoon, The (Europe)',
    disc: 1,
    regions: ['Europe'],
    languages: undefined,
    tags: ['Europe', 'Disc 1'],
  });

  assert.deepEqual(parseName('688 Attack Sub (USA, Europe)'), {
    title: '688 Attack Sub',
    name: '688 Attack Sub (USA, Europe)',
    disc: null,
    regions: ['USA', 'Europe'],
    languages: undefined,
    tags: ['USA', 'Europe'],
  });

  assert.deepEqual(parseName('Contra - Hard Corps (USA) (Contra Anniversary Collection)'), {
    title: 'Contra - Hard Corps',
    name: 'Contra - Hard Corps (USA) (Contra Anniversary Collection)',
    disc: null,
    regions: ['USA'],
    languages: undefined,
    tags: ['USA', 'Contra Anniversary Collection'],
  });

  assert.deepEqual(parseName('Atlantis no Nazo (Japan) (Virtual Console, Switch Online)'), {
    title: 'Atlantis no Nazo',
    name: 'Atlantis no Nazo (Japan)',
    disc: null,
    regions: ['Japan'],
    languages: undefined,
    tags: ['Japan', 'Virtual Console', 'Switch Online'],
  });
});
