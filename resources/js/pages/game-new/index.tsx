import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import GameForm from '../../components/game-form';
import Game from '../../types/Game';
import Platform from '../../types/Platform';

export default function GameNewPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { platformId } = useParams<{ platformId: string }>();
  const [, setLocation] = useLocation();

  const { data: platform } = useFetch<Platform>(`/platforms/${platformId}`);

  const handleSubmit = async (values: any) => {
    const response = await xior.post<Game>('/games', values);
    message.success(t('create-success'));
    setLocation(`/platforms/${response.data.platformId}/games/${response.data.id}`);
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          {
            title: (
              <Link href={`/platforms/${platformId}`}>{platform?.name || t('platforms')}</Link>
            ),
          },
          { title: t('new') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>{t('new')}</Typography.Title>

      <Card>
        <GameForm
          initialPlatformId={Number(platformId)}
          onSubmit={handleSubmit}
          submitText={t('create')}
        />
      </Card>
    </Container>
  );
}
