/* eslint-disable no-console */
import { download } from '@guoyunhe/downloader';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';

export async function downloadGithubRepo(org: string, repo: string): Promise<void> {
  const url = `https://github.com/${org}/${repo}/archive/refs/heads/master.tar.gz`;
  if (existsSync(`${process.cwd()}/tmp/${repo}-master`)) {
    return;
  }
  const tmp = `${process.cwd()}/tmp/`;
  try {
    await download(url, tmp, {
      extract: true,
    });
  } catch {
    console.error(`Failed to download ${url}`);
  }
}

export async function deleteGithubRepo(repo: string): Promise<void> {
  const path = `${process.cwd()}/tmp/${repo}-master`;
  if (existsSync(path)) {
    await rm(path, { recursive: true, force: true });
  }
}

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
