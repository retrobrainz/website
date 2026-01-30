import Emulator from './Emulator.js';
import Image from './Image.js';
import OperatingSystem from './OperatingSystem.js';

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
  createdAt: string;
  updatedAt: string | null;
}
