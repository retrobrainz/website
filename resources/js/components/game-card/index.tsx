import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import Game from '../../types/Game.js';

export interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/platforms/${game.platformId}/games/${game.id}`}>
      <Card
        cover={
          <img
            src={game.boxart?.url}
            width={game.boxart?.width}
            height={game.boxart?.height}
            style={{ width: '100%', height: 'auto' }}
          />
        }
      >
        <Card.Meta title={game.name} description={`${t('favorites')}: ${game.favoritesCount ?? 0}`} />
      </Card>
    </Link>
  );
}
