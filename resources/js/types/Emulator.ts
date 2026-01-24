import Image from './Image.js';

export default interface Emulator {
  id: number;
  name: string;
  website: string | null;
  icon: Image | null;
  createdAt: string;
  updatedAt: string | null;
}
