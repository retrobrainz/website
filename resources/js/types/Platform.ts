import Company from './Company.js';
import Image from './Image.js';

export default interface Platform {
  id: number;
  name: string;
  company: Company | null;
  screenWidth: number;
  screenHeight: number;
  logoId: number | null;
  releaseDate: string | null;
  logo: Image | null;
  gamesCount?: number | null;
}
