import Frontend from './Frontend';
import Image from './Image';
import OperatingSystem from './OperatingSystem';
import Platform from './Platform';

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
