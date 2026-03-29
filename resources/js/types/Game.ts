import Company from './Company';
import Image from './Image';
import Language from './Language';
import Platform from './Platform';
import Region from './Region';
import Rom from './Rom';
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
  serial: string | null;
  releaseDate: string | null;
  esrbRating: string | null;
  pegiRating: string | null;
  ceroRating: string | null;
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
  languages?: Language[];
  roms?: Rom[];
  favoritesCount?: number;
}
