import { HeartOutlined } from '@ant-design/icons';
import { Card, Flex } from 'antd';
import { Link } from 'wouter';
import fallbackImage from '../../../img/fallback-screenshot.avif';
import Game from '../../types/Game.js';

export interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
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
