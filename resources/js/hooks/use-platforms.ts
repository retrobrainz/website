import { useFetch } from 'react-fast-fetch';
import Platform from '../types/Platform';

interface UsePlatformsParams {
  titleId?: number;
  franchiseId?: number;
  developerId?: number;
  publisherId?: number;
}

export default function usePlatforms(params: UsePlatformsParams = {}, disabled = false) {
  return useFetch<Platform[]>('/platforms', {
    params,
    disabled,
  });
}
