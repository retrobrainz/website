import Game from './Game.js';

export default interface Franchise {
  id: number;
  name: string;
  games?: Game[];
  gamesCount?: number | null;
  createdAt: string;
  updatedAt: string | null;
}
