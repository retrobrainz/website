import Game from './Game';

export interface GenreTranslation {
  id: number;
  locale: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export default interface Genre {
  id: number;
  name: string;
  translations?: GenreTranslation[];
  games?: Game[];
  gamesCount?: number | null;
  createdAt: string;
  updatedAt: string | null;
}
