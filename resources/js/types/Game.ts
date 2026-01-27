import Favorite from '#models/favorite';
import Company from './Company.js';
import Franchise from './Franchise.js';
import Genre from './Genre.js';
import Image from './Image.js';
import Platform from './Platform.js';
import Region from './Region.js';

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
  snapId: number | null;
  titlescreenId: number | null;
  createdAt: string;
  updatedAt: string | null;
  boxart: Image | null;
  logo: Image | null;
  snap: Image | null;
  titlescreen: Image | null;
  regions?: Region[];
  developers?: Company[];
  publishers?: Company[];
  franchises?: Franchise[];
  genres?: Genre[];
  favoritesCount?: number;
  myFavorite?: Favorite | null;
}
