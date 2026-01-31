import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import Franchise from '../../types/Franchise.js';

export interface FranchiseCardProps {
  franchise: Franchise;
}

export default function FranchiseCard({ franchise }: FranchiseCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/franchises/${franchise.id}`}>
      <Card
        hoverable
        style={{ height: '100%' }}
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 120,
          },
        }}
      >
        <Card.Meta
          title={franchise.name}
          description={`${franchise.gamesCount ?? 0} ${t('games')}`}
        />
      </Card>
    </Link>
  );
}
