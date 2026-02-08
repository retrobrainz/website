import Title from './Title';

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
  translations?: GenreTranslation[];
  titles?: Title[];
  titlesCount?: number | null;
  createdAt: string;
  updatedAt: string | null;
}
