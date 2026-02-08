import { Card } from 'antd';
import { Link } from 'wouter';
import Company from '../../types/Company';

export interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.id}`}>
      <Card hoverable>
        <Card.Meta title={company.name} />
      </Card>
    </Link>
  );
}
