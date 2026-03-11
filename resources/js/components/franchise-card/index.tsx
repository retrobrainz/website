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
          avatar={
            franchise.icon && (
              <img
                src={franchise.icon.url}
                alt={`${franchise.name} icon`}
                width={56}
                height={56}
                style={{ display: 'block', borderRadius: 4 }}
              />
            )
          }
          title={franchise.translations?.[0]?.name || franchise.name}
          description={`${franchise.titlesCount ?? 0} ${t('titles')}`}
        />
      </Card>
    </Link>
  );
}
