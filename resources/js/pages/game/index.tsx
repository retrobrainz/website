import { Badge, Breadcrumb, Card, Descriptions, Flex, Image, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { Link, useParams } from 'wouter';
import Game from '../../types/Game.js';
import ImageUpload from '../platform/ImageUpload.js';
import FavoriteButton from './FavoriteButton.js';

export default function GamePage() {
  const { gameId } = useParams();

  const { data: game, reload } = useFetch<Game>(`/games/${gameId}`);

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

      <Flex gap={16} align="center" style={{ marginBottom: 24 }}>
        <FavoriteButton gameId={gameId} favoritesCount={game?.favoritesCount} onToggle={reload} />
      </Flex>

      <Image.PreviewGroup>
        <Flex gap={16} align="center" style={{ marginBottom: 24 }}>
          <Badge.Ribbon text="Boxart" color="green" styles={{ root: { flex: '1 1 33%' } }}>
            {game?.boxartId === null ? (
              <Flex justify="center" align="center" style={{ height: 150, background: '#ccc' }}>
                <ImageUpload game={game} type="boxart" onFinish={reload} />
              </Flex>
            ) : (
              <Image src={game?.boxart?.url} alt={`${game?.name} Boxart`} />
            )}
          </Badge.Ribbon>
          <Badge.Ribbon text="Title" color="orange" styles={{ root: { flex: '1 1 33%' } }}>
            {game?.titleId === null ? (
              <Flex justify="center" align="center" style={{ height: 150, background: '#ccc' }}>
                <ImageUpload game={game} type="title" onFinish={reload} />
              </Flex>
            ) : (
              <Image src={game?.title?.url} alt={`${game?.name} Title`} />
            )}
          </Badge.Ribbon>
          <Badge.Ribbon text="Snap" color="blue" styles={{ root: { flex: '1 1 33%' } }}>
            {game?.snapId === null ? (
              <Flex justify="center" align="center" style={{ height: 150, background: '#ccc' }}>
                <ImageUpload game={game} type="snap" onFinish={reload} />
              </Flex>
            ) : (
              <Image src={game?.snap?.url} alt={`${game?.name} Snap`} />
            )}
          </Badge.Ribbon>
        </Flex>
      </Image.PreviewGroup>

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
