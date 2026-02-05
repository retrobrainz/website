import Company from './Company.js';
import Franchise from './Franchise.js';
import Genre from './Genre.js';
import Image from './Image.js';
import Platform from './Platform.js';
import Region from './Region.js';

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
  platform: Platform | null;
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
  franchises?: Franchise[];
  genres?: Genre[];
  favoritesCount?: number;
}
