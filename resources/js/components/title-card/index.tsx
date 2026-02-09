import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import Title from '../../types/Title';

export interface TitleCardProps {
  title: Title;
}
// 123s
export default function TitleCard({ title }: TitleCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/titles/${title.id}`}>
      <Card hoverable>
        <Card.Meta
          title={title.translations?.[0]?.name || title.name}
          description={
            <div>
              {`${title.gamesCount ?? 0} ${t('games')}`}&nbsp;|&nbsp;
              {Array.from(new Set(title.platforms?.map((platform) => platform.name)))
                .sort()
                .join(', ')}
            </div>
          }
        />
      </Card>
    </Link>
  );
}
