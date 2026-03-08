export default interface Company {
  id: number;
  name: string;
  wikipedia: string | null;
  parentId: number | null;
  parent?: Company | null;
  children?: Company[] | null;
  createdAt: string;
  updatedAt: string | null;
}
