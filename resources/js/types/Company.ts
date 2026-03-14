export default interface Company {
  id: number;
  name: string;
  abbr: string | null;
  wikipedia: string | null;
  foundingDate: string | null;
  defunctDate: string | null;
  parentId: number | null;
  parent?: Company | null;
  children?: Company[] | null;
  createdAt: string;
  updatedAt: string | null;
}
