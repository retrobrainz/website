import Title from './Title';

export interface FranchiseTranslation {
  id: number;
  locale: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export default interface Franchise {
  id: number;
  name: string;
  translations?: FranchiseTranslation[];
  titles?: Title[];
  titlesCount?: number | null;
  createdAt: string;
  updatedAt: string | null;
}
