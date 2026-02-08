import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import Franchise from '../../types/Franchise';

export interface FranchiseCardProps {
  franchise: Franchise;
}

export default function FranchiseCard({ franchise }: FranchiseCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/franchises/${franchise.id}`}>
      <Card hoverable>
        <Card.Meta
          title={franchise.translations?.[0]?.name || franchise.name}
          description={`${franchise.titlesCount ?? 0} ${t('titles')}`}
        />
      </Card>
    </Link>
  );
}
