import Game from './Game.js';
import User from './User.js';

export default interface Favorite {
  id: number;
  userId: number;
  gameId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  game?: Game;
}
