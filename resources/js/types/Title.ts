import Franchise from './Franchise';
import Game from './Game';
import Genre from './Genre';
import Platform from './Platform';

export interface TitleTranslation {
  id: number;
  locale: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export default interface Title {
  id: number;
  name: string;
  wikipedia: string | null;
  translations?: TitleTranslation[];
  games?: Game[];
  gamesCount?: number;
  platforms?: Platform[];
  franchises?: Franchise[];
  genres?: Genre[];
  createdAt: string;
  updatedAt: string;
}
