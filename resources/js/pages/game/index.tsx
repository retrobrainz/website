import { Breadcrumb, Card, Descriptions, Typography } from 'antd';
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

      <Card style={{ marginBottom: 24 }}>
        <Descriptions
          column={2}
          items={[
            {
              label: 'Region(s)',
              children: game?.regions?.map((region) => region.name).join(', ') || 'N/A',
            },
            {
              label: 'Release Date',
              children: game?.releaseDate || 'N/A',
            },
            {
              label: 'Developer(s)',
              children: game?.developers?.map((developer) => developer.name).join(', ') || 'N/A',
            },
            {
              label: 'Publisher(s)',
              children: game?.publishers?.map((publisher) => publisher.name).join(', ') || 'N/A',
            },
            {
              label: 'Franchise',
              children: game?.franchises?.map((franchise) => franchise.name).join(', ') || 'N/A',
            },
            {
              label: 'Genre(s)',
              children: game?.genres?.map((genre) => genre.name).join(', ') || 'N/A',
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
      </Card>

      <p>Details about the game will go here.</p>
    </Container>
  );
}
