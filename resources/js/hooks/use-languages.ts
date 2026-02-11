import { useFetch } from 'react-fast-fetch';
import Language from '../types/Language';

interface UseLanguagesParams {
  platformId?: number;
  titleId?: number;
  franchiseId?: number;
  developerId?: number;
  publisherId?: number;
}

export default function useLanguages(params: UseLanguagesParams, disabled = false) {
  return useFetch<Language[]>('/languages', {
    params,
    disabled,
  });
}
