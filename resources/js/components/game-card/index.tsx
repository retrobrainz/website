import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import fallbackImage from '../../../img/fallback-screenshot.avif';
import Game from '../../types/Game.js';

export interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { t } = useTranslation();

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
          title={game.name}
          description={`${t('favorites')}: ${game.favoritesCount ?? 0}`}
        />
      </Card>
    </Link>
  );
}
