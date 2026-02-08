import Company from './Company';
import Image from './Image';
import Platform from './Platform';
import Region from './Region';
import Title from './Title';

export interface GameTranslation {
  id: number;
  locale: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export default interface Game {
  id: number;
  platformId: number | null;
  platform?: Platform | null;
  titleId: number | null;
  title?: Title | null;
  name: string;
  releaseDate: string | null;
  esrbRating: string | null;
  pegiRating: string | null;
  boxartId: number | null;
  logoId: number | null;
  screenshotId: number | null;
  titlescreenId: number | null;
  createdAt: string;
  updatedAt: string | null;
  boxart: Image | null;
  logo: Image | null;
  screenshot: Image | null;
  titlescreen: Image | null;
  translations?: GameTranslation[];
  regions?: Region[];
  developers?: Company[];
  publishers?: Company[];
  favoritesCount?: number;
}
