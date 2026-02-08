import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import GenreForm from '../../components/genre-form';
import type Genre from '../../types/Genre';

export default function GenreEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { genreId } = useParams<{ genreId: string }>();
  const [, setLocation] = useLocation();
  const { data: genre } = useFetch<Genre>(`/genres/${genreId}`);

  const handleSubmit = async (values: any) => {
    await xior.put(`/genres/${genreId}`, values);
    message.success(t('update-success'));
    setLocation(`/genres/${genreId}`);
  };

  const displayName = genre?.translations?.[0]?.name || genre?.name || '...';

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/genres">{t('genres')}</Link> },
          { title: <Link href={`/genres/${genreId}`}>{displayName}</Link> },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>
        {t('edit')}: {displayName}
      </Typography.Title>

      <Card>
        <GenreForm genre={genre} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
