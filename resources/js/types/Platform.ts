export default interface Platform {
  id: number;
  name: string;
  company: {
    id: number;
    name: string;
  } | null;
  screenWidth: number;
  screenHeight: number;
  releaseDate: string;
  gamesCount?: number | null;
}
