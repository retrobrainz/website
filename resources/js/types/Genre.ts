export interface GenreTranslation {
  id: number;
  locale: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export default interface Genre {
  id: number;
  name: string;
  wikipedia?: string | null;
  translations?: GenreTranslation[];
  titlesCount?: number | null;
  createdAt: string;
  updatedAt: string | null;
}
