export interface CompanyName {
  id: number;
  companyId: number;
  name: string;
  abbr: string | null;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string | null;
}

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
  names?: CompanyName[] | null;
  createdAt: string;
  updatedAt: string | null;
}
