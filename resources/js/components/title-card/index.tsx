import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import Title from '../../types/Title';

export interface TitleCardProps {
  title: Title;
}

export default function TitleCard({ title }: TitleCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/titles/${title.id}`}>
      <Card hoverable>
        <Card.Meta
          title={title.translations?.[0]?.name || title.name}
          description={`${title.gamesCount ?? 0} ${t('games')}`}
        />
      </Card>
    </Link>
  );
}
