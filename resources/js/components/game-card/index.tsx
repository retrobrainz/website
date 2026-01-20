import { Card } from 'antd';
import Game from '../../types/Game.js';

export interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card>
      <Card.Meta title={game.name} description={`Favorites: ${game.favoritesCount ?? 0}`} />
    </Card>
  );
}
