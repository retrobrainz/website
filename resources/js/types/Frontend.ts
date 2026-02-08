import Emulator from './Emulator';
import Image from './Image';
import OperatingSystem from './OperatingSystem';

export default interface Frontend {
  id: number;
  name: string;
  website: string | null;
  sourceCode: string | null;
  iconId: number | null;
  icon: Image | null;
  screenshotId: number | null;
  screenshot: Image | null;
  emulators?: Emulator[] | null;
  operatingSystems?: OperatingSystem[] | null;
  favoritesCount?: number | null;
  createdAt: string;
  updatedAt: string | null;
}
