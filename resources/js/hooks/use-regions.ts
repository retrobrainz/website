import { useFetch } from 'react-fast-fetch';
import Region from '../types/Region';

interface UseRegionsParams {
  platformId?: number;
  titleId?: number;
  franchiseId?: number;
  developerId?: number;
  publisherId?: number;
}

export default function useRegions(params: UseRegionsParams, disabled = false) {
  return useFetch<Region[]>('/regions', {
    params,
    disabled,
  });
}
