import Franchise from './Franchise';
import Genre from './Genre';

export default interface Title {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  franchises?: Franchise[];
  genres?: Genre[];
}
