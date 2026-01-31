import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import xior from 'xior';
import GenreForm from '../../components/genre-form/index.js';
import Genre from '../../types/Genre.js';

export default function GenreNewPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleSubmit = async (values: any) => {
    const response = await xior.post<Genre>('/genres', values);
    message.success(t('genre-created-successfully'));
    setLocation(`/genres/${response.data.id}`);
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/genres">{t('genres')}</Link> },
          { title: t('new') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>{t('new-genre')}</Typography.Title>

      <Card>
        <GenreForm onSubmit={handleSubmit} submitText={t('create')} />
      </Card>
    </Container>
  );
}
