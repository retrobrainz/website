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
