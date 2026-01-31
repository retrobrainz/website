import { Badge, Breadcrumb, Card, Descriptions, Flex, Image, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import Game from '../../types/Game.js';
import ImageUpload from '../platform/ImageUpload.js';
import FavoriteButton from '../../components/favorite-button/index.js';

export default function GamePage() {
  const { gameId } = useParams();
  const { t } = useTranslation();

  const { data: game, reload } = useFetch<Game>(`/games/${gameId}`);

  return (
    <Container maxWidth="lg" style={{ paddingTop: 16 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
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
        <FavoriteButton
          entityType="game"
          entityId={gameId}
          favoritesCount={game?.favoritesCount}
          onToggle={reload}
        />
      </Flex>

      <Image.PreviewGroup>
        <Flex gap={16} align="center" style={{ marginBottom: 24 }}>
          <Badge.Ribbon text={t('boxart')} color="green" styles={{ root: { flex: '1 1 33%' } }}>
            {game?.boxartId === null ? (
              <Flex justify="center" align="center" style={{ height: 150, background: '#ccc' }}>
                <ImageUpload game={game} type="boxart" onFinish={reload} />
              </Flex>
            ) : (
              <Image src={game?.boxart?.url} alt={`${game?.name} ${t('boxart')}`} />
            )}
          </Badge.Ribbon>
          <Badge.Ribbon
            text={t('titlescreen')}
            color="orange"
            styles={{ root: { flex: '1 1 33%' } }}
          >
            {game?.titlescreenId === null ? (
              <Flex justify="center" align="center" style={{ height: 150, background: '#ccc' }}>
                <ImageUpload game={game} type="titlescreen" onFinish={reload} />
              </Flex>
            ) : (
              <Image src={game?.titlescreen?.url} alt={`${game?.name} ${t('titlescreen')}`} />
            )}
          </Badge.Ribbon>
          <Badge.Ribbon text={t('screenshot')} color="blue" styles={{ root: { flex: '1 1 33%' } }}>
            {game?.screenshotId === null ? (
              <Flex justify="center" align="center" style={{ height: 150, background: '#ccc' }}>
                <ImageUpload game={game} type="screenshot" onFinish={reload} />
              </Flex>
            ) : (
              <Image src={game?.screenshot?.url} alt={`${game?.name} ${t('screenshot')}`} />
            )}
          </Badge.Ribbon>
        </Flex>
      </Image.PreviewGroup>

      <Card style={{ marginBottom: 24 }}>
        <Descriptions
          column={2}
          items={[
            {
              label: t('regions'),
              children: game?.regions?.map((region) => region.name).join(', ') || 'N/A',
            },
            {
              label: t('release-date'),
              children: game?.releaseDate || 'N/A',
            },
            {
              label: t('developers'),
              children: game?.developers?.map((developer) => developer.name).join(', ') || 'N/A',
            },
            {
              label: t('publishers'),
              children: game?.publishers?.map((publisher) => publisher.name).join(', ') || 'N/A',
            },
            {
              label: t('franchise'),
              children: game?.franchises?.map((franchise) => franchise.name).join(', ') || 'N/A',
            },
            {
              label: t('genres'),
              children: game?.genres?.map((genre) => genre.name).join(', ') || 'N/A',
            },
            {
              label: t('esrb-rating'),
              children: game?.esrbRating || 'N/A',
            },
            {
              label: t('pegi-rating'),
              children: game?.pegiRating || 'N/A',
            },
          ]}
        />
      </Card>

      <p>{t('game-details-placeholder')}</p>
    </Container>
  );
}
