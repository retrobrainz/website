import { App, Breadcrumb, Card, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import PlatformForm from '../../components/platform-form';
import type Platform from '../../types/Platform';

export default function PlatformEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { platformId } = useParams<{ platformId: string }>();
  const [, setLocation] = useLocation();
  const { data: platform, loading } = useFetch<Platform>(`/platforms/${platformId}`);

  const handleSubmit = async (values: any) => {
    await xior.put(`/platforms/${platformId}`, values);
    message.success(t('update-success'));
    setLocation(`/platforms/${platformId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      </Container>
    );
  }

  if (!platform) {
    return (
      <Container maxWidth="md">
        <Typography.Text>{t('not-found')}</Typography.Text>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/platforms">{t('platforms')}</Link> },
          { title: <Link href={`/platforms/${platformId}`}>{platform.name}</Link> },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>
        {t('edit')}: {platform.name}
      </Typography.Title>

      <Card>
        <PlatformForm platform={platform} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
