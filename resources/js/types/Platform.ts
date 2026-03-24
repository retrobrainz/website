import Company from './Company';
import Emulator from './Emulator';
import Image from './Image';

export default interface Platform {
  id: number;
  name: string;
  abbr: string | null;
  wikipedia: string | null;
  company: Company | null;
  companyId?: number | null;
  screenWidth: number;
  screenHeight: number;
  logoId: number | null;
  photoId?: number | null;
  releaseDate: string | null;
  logo: Image | null;
  photo: Image | null;
  emulators?: Emulator[] | null;
  gamesCount?: number | null;
}
