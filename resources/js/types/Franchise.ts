import type Image from './Image';
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
  iconId?: number | null;
  icon?: Image | null;
  wikipedia?: string | null;
  translations?: FranchiseTranslation[];
  titles?: Title[];
  titlesCount?: number | null;
  createdAt: string;
  updatedAt: string | null;
}
