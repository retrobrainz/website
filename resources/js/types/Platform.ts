import Company from './Company';
import Image from './Image';

export default interface Platform {
  id: number;
  name: string;
  company: Company | null;
  screenWidth: number;
  screenHeight: number;
  logoId: number | null;
  releaseDate: string | null;
  logo: Image | null;
  photo: Image | null;
  gamesCount?: number | null;
}
