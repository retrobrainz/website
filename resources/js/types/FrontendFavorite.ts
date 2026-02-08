import Frontend from './Frontend';
import User from './User';

export default interface FrontendFavorite {
  id: number;
  userId: number;
  frontendId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  frontend?: Frontend;
}
