import Platform from '#models/platform';
import Image from './Image.js';

export default interface Game {
  id: number;
  platformId: number | null;
  platform: Platform | null;
  name: string;
  releaseDate: string | null;
  boxart: Image | null;
  logo: Image | null;
  snap: Image | null;
  title: Image | null;
  region: {
    id: number;
    name: string;
  };
}
