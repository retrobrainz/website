import { App, Breadcrumb, Card, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import GameForm from '../../components/game-form';
import Game from '../../types/Game';

export default function GameEditPage() {
  const { message } = App.useApp();
  const { gameId } = useParams<{ gameId: string }>();
  const { t, i18n } = useTranslation();
  const [, setLocation] = useLocation();

  const { data: game, loading } = useFetch<Game>(`/games/${gameId}`);

  const gameTranslation = game?.translations?.find((tr) => tr.locale === i18n.language);
  const displayName = gameTranslation?.name || game?.name;

  const handleSubmit = async (values: any) => {
    await xior.put(`/games/${gameId}`, values);
    message.success(t('update-success'));
    setLocation(`/platforms/${game?.platformId}/games/${gameId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      </Container>
    );
  }

  if (!game) {
    return (
      <Container maxWidth="md">
        <Typography.Text>{t('not-found')}</Typography.Text>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ paddingTop: 16 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          {
            title: (
              <Link href={`/platforms/${game.platform?.id}`}>{game.platform?.name || '...'}</Link>
            ),
          },
          {
            title: (
              <Link href={`/platforms/${game.platformId}/games/${game.id}`}>{displayName}</Link>
            ),
          },
          { title: t('edit') },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Typography.Title level={1}>
        {t('edit')}: {displayName}
      </Typography.Title>

      <Card>
        <GameForm game={game} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
