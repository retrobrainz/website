import { HeartOutlined } from '@ant-design/icons';
import { Card, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import fallbackImage from '../../../img/fallback-screenshot.avif';
import Game from '../../types/Game';

export interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { i18n } = useTranslation();
  const translation = game.translations?.find((tr) => tr.locale === i18n.language);
  const displayName = translation?.name || game.name;

  return (
    <Link href={`/platforms/${game.platformId}/games/${game.id}`}>
      <Card
        hoverable
        cover={
          <img
            src={game.boxart?.url ?? fallbackImage}
            style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: 1 }}
          />
        }
      >
        <Card.Meta
          title={displayName}
          description={
            <Flex gap={4}>
              <HeartOutlined />
              {game.favoritesCount ?? 0}
            </Flex>
          }
        />
      </Card>
    </Link>
  );
}
