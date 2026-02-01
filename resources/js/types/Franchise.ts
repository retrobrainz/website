import Game from './Game.js';

export interface FranchiseTranslation {
  id: number;
  locale: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export default interface Franchise {
  id: number;
  name: string;
  translations?: FranchiseTranslation[];
  games?: Game[];
  gamesCount?: number | null;
  createdAt: string;
  updatedAt: string | null;
}
