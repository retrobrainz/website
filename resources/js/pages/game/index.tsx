import { Badge, Breadcrumb, Button, Card, Descriptions, Flex, Image, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import fallbackImage from '../../../img/fallback-screenshot.avif';
import FavoriteButton from '../../components/favorite-button';
import Game from '../../types/Game';
import ImageUpload from '../platform/ImageUpload';

export default function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const { t, i18n } = useTranslation();

  const { data: game, reload } = useFetch<Game>(`/games/${gameId}`);

  const gameTranslation = game?.translations?.find((tr) => tr.locale === i18n.language);
  const displayName = gameTranslation?.name || game?.name;

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
            title: displayName || '...',
          },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Typography.Title level={1}>{displayName}</Typography.Title>

      <Flex gap={16} align="center" style={{ marginBottom: 24 }}>
        <FavoriteButton
          entityType="game"
          entityId={gameId}
          favoritesCount={game?.favoritesCount}
          onToggle={reload}
        />
        <Link href={`/platforms/${game?.platform?.id}/games/${game?.id}/translate`}>
          <Button>{t('translate')}</Button>
        </Link>
      </Flex>

      <Image.PreviewGroup>
        <Flex gap={16} align="center" style={{ marginBottom: 24 }}>
          <Badge.Ribbon text={t('boxart')} color="green" styles={{ root: { flex: '1 1 33%' } }}>
            <div>
              <Image
                src={game?.boxart?.url || fallbackImage}
                alt={`${displayName} ${t('boxart')}`}
                fallback={fallbackImage}
              />
              {game?.boxartId === null && (
                <Flex justify="center" style={{ marginTop: 8 }}>
                  <ImageUpload game={game} type="boxart" onFinish={reload} />
                </Flex>
              )}
            </div>
          </Badge.Ribbon>
          <Badge.Ribbon
            text={t('titlescreen')}
            color="orange"
            styles={{ root: { flex: '1 1 33%' } }}
          >
            <div>
              <Image
                src={game?.titlescreen?.url || fallbackImage}
                alt={`${displayName} ${t('titlescreen')}`}
                fallback={fallbackImage}
              />
              {game?.titlescreenId === null && (
                <Flex justify="center" style={{ marginTop: 8 }}>
                  <ImageUpload game={game} type="titlescreen" onFinish={reload} />
                </Flex>
              )}
            </div>
          </Badge.Ribbon>
          <Badge.Ribbon text={t('screenshot')} color="blue" styles={{ root: { flex: '1 1 33%' } }}>
            <div>
              <Image
                src={game?.screenshot?.url || fallbackImage}
                alt={`${displayName} ${t('screenshot')}`}
                fallback={fallbackImage}
              />
              {game?.screenshotId === null && (
                <Flex justify="center" style={{ marginTop: 8 }}>
                  <ImageUpload game={game} type="screenshot" onFinish={reload} />
                </Flex>
              )}
            </div>
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
              label: t('languages'),
              children: game?.languages?.map((language) => language.name).join(', ') || 'N/A',
            },
            {
              label: t('release-date'),
              children: game?.releaseDate || 'N/A',
            },
            {
              label: t('developers'),
              children:
                game?.developers && game.developers.length > 0
                  ? game.developers.map((developer, index, arr) => (
                      <span key={developer.id}>
                        <Link href={`/companies/${developer.id}`}>{developer.name}</Link>
                        {index < arr.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  : 'N/A',
            },
            {
              label: t('publishers'),
              children:
                game?.publishers && game.publishers.length > 0
                  ? game.publishers.map((publisher, index, arr) => (
                      <span key={publisher.id}>
                        <Link href={`/companies/${publisher.id}`}>{publisher.name}</Link>
                        {index < arr.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  : 'N/A',
            },
            {
              label: t('franchise'),
              children:
                game?.title?.franchises && game.title.franchises.length > 0
                  ? game.title.franchises.map((franchise, index, arr) => {
                      const translation = franchise.translations?.find(
                        (tr) => tr.locale === i18n.language,
                      );
                      return (
                        <span key={franchise.id}>
                          <Link href={`/franchises/${franchise.id}`}>
                            {translation?.name || franchise.name}
                          </Link>
                          {index < arr.length - 1 ? ', ' : ''}
                        </span>
                      );
                    })
                  : 'N/A',
            },
            {
              label: t('genres'),
              children:
                game?.title?.genres && game.title.genres.length > 0
                  ? game.title.genres.map((genre, index, arr) => {
                      const translation = genre.translations?.find(
                        (tr) => tr.locale === i18n.language,
                      );
                      return (
                        <span key={genre.id}>
                          <Link href={`/genres/${genre.id}`}>
                            {translation?.name || genre.name}
                          </Link>
                          {index < arr.length - 1 ? ', ' : ''}
                        </span>
                      );
                    })
                  : 'N/A',
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
    </Container>
  );
}
