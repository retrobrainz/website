import Game from './Game';
import User from './User';

export default interface GameFavorite {
  id: number;
  userId: number;
  gameId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  game?: Game;
}
