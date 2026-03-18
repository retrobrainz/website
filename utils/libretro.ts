import type Platform from '#models/platform';
import { downloadGithubRepo } from '#utils/github';

export async function importLibretro(platform: Platform): Promise<void> {
  await downloadGithubRepo('libretro', 'libretro-database');

  await platform.downloadThumbnails();

  await platform.fetchDat();

  process.env.NODE_ENV === 'production' && (await platform.deleteThumbnails());
}
