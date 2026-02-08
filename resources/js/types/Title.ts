import Franchise from './Franchise';

export default interface Title {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  franchises?: Franchise[];
}
