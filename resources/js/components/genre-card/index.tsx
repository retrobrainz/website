import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import Genre from '../../types/Genre';

export interface GenreCardProps {
  genre: Genre;
}

export default function GenreCard({ genre }: GenreCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/genres/${genre.id}`}>
      <Card hoverable>
        <Card.Meta
          title={genre.translations?.[0]?.name || genre.name}
          description={`${genre.gamesCount ?? 0} ${t('games')}`}
        />
      </Card>
    </Link>
  );
}
