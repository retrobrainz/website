import Emulator from './Emulator';
import User from './User';

export default interface EmulatorFavorite {
  id: number;
  userId: number;
  emulatorId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  emulator?: Emulator;
}
