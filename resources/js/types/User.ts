import type Image from './Image.js';

export default interface User {
  id: number;
  username: string;
  email: string;
  avatar: Image | null;
}
