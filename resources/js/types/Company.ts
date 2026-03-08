export default interface Company {
  id: number;
  name: string;
  parentId: number | null;
  parent?: Company | null;
  createdAt: string;
  updatedAt: string | null;
}
