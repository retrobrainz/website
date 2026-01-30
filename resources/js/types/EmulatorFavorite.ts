import Emulator from './Emulator.js';
import User from './User.js';

export default interface EmulatorFavorite {
  id: number;
  userId: number;
  emulatorId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  emulator?: Emulator;
}
