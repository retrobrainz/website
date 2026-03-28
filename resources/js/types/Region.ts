export interface RegionTranslation {
  id: number;
  locale: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export default interface Region {
  id: number;
  name: string;
  gamesCount?: number | null;
  translations?: RegionTranslation[];
  createdAt: string;
  updatedAt: string | null;
}
