import { CalendarOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import fallbackImage from '../../../img/fallback-screenshot.avif';
import Title from '../../types/Title';

export interface TitleCardProps {
  title: Title;
}
// 123s
export default function TitleCard({ title }: TitleCardProps) {
  const { t } = useTranslation();
  const displayName = title.translations?.[0]?.name || title.name;
  const featuredGame = title.games?.[0]?.boxart?.url ?? fallbackImage;
  const platforms = Array.from(
    new Set(title.platforms?.map((platform) => platform.abbr || platform.name)),
  ).sort();
  const releaseYear = title.releaseDate?.slice(0, 4);

  return (
    <Link href={`/titles/${title.id}`}>
      <Card
        hoverable
        cover={
          <img
            src={featuredGame}
            alt={`${displayName} boxart`}
            style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: 1 }}
          />
        }
      >
        <Card.Meta
          title={displayName}
          description={
            <Space separator="|">
              {releaseYear && (
                <span>
                  <CalendarOutlined />
                  &nbsp;
                  {releaseYear}
                </span>
              )}
              <span>{`${title.gamesCount ?? 0} ${t('games')}`}</span>
              <span>{platforms.join(', ')}</span>
            </Space>
          }
        />
      </Card>
    </Link>
  );
}
