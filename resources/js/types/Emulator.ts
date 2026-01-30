import Frontend from './Frontend.js';
import Image from './Image.js';
import OperatingSystem from './OperatingSystem.js';
import Platform from './Platform.js';

export default interface Emulator {
  id: number;
  name: string;
  website: string | null;
  sourceCode: string | null;
  iconId: number | null;
  icon: Image | null;
  screenshotId: number | null;
  screenshot: Image | null;
  state: string | null;
  releaseDate: string | null;
  operatingSystems?: OperatingSystem[] | null;
  platforms?: Platform[] | null;
  frontends?: Frontend[] | null;
  favoritesCount?: number | null;
  createdAt: string;
  updatedAt: string | null;
}
