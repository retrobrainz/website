import Platform from '#models/platform';
import Image from './Image.js';

export default interface Game {
  id: number;
  platform: Platform | null;
  name: string;
  releaseDate: string | null;
  title: {
    id: number;
    name: string;
  };
  region: {
    id: number;
    name: string;
  };
  images: Array<{
    id: number;
    type: 'boxart' | 'titlescreen' | 'screenshot' | string;
    image: Image;
  }>;
}
