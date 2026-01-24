import Company from './Company.js';

export default interface Platform {
  id: number;
  name: string;
  company: Company | null;
  screenWidth: number;
  screenHeight: number;
  releaseDate: string | null;
  gamesCount?: number | null;
}
