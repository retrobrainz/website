export interface LanguageTranslation {
  id: number;
  locale: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export default interface Language {
  id: number;
  name: string;
  translations?: LanguageTranslation[];
  createdAt: string;
  updatedAt: string | null;
}
