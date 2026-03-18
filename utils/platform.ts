/* eslint-disable no-console */

export function deduplicate(games: any[]): any[] {
  const gamesMap: Record<string, any> = {};
  games.forEach((game) => {
    const { crc } = game.$entries[0];
    const serial = game.$entries[0].serial || game.serial;
    const key = JSON.stringify({ crc, serial });
    if (!gamesMap[key]) {
      gamesMap[key] = game;
    } else {
      console.log(`Deduplicating game: ${game.name} (${crc}/${serial})`);
      gamesMap[key].$entries = [...gamesMap[key].$entries, ...game.$entries];
    }
  });
  return Object.values(gamesMap);
}

export function fixSerial(serial: string): string {
  if (!serial) return serial;
  if (serial === 'SLUS21568') return 'SLUS-21568';
  return serial;
}
