import Frontend from './Frontend.js';
import User from './User.js';

export default interface FrontendFavorite {
  id: number;
  userId: number;
  frontendId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  frontend?: Frontend;
}
