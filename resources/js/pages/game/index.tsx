import { Breadcrumb, Descriptions, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { Link, useParams } from 'wouter';
import Game from '../../types/Game.js';

export default function GamePage() {
  const { gameId } = useParams();

  const { data: game } = useFetch<Game>(`/games/${gameId}`);

  return (
    <Container maxWidth="lg" style={{ paddingTop: 16 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">Home</Link> },
          {
            title: (
              <Link href={`/platforms/${game?.platform?.id}`}>{game?.platform?.name || '...'}</Link>
            ),
          },
          {
            title: game?.name || '...',
          },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Typography.Title level={1}>{game?.name}</Typography.Title>

      <Descriptions
        items={[
          {
            label: 'Name',
            children: game?.name || '...',
          },
          {
            label: 'Region(s)',
            children: game?.regions?.map((region) => region.name).join(', ') || 'N/A',
          },
          {
            label: 'Release Date',
            children: game?.releaseDate || 'N/A',
          },
          {
            label: 'ESRB Rating',
            children: game?.esrbRating || 'N/A',
          },
          {
            label: 'PEGI Rating',
            children: game?.pegiRating || 'N/A',
          },
        ]}
      />

      <p>Details about the game will go here.</p>
    </Container>
  );
}
