import { App, Breadcrumb, Card, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import FrontendForm from '../../components/frontend-form/index.js';
import type Frontend from '../../types/Frontend.js';

export default function FrontendEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { frontendId } = useParams<{ frontendId: string }>();
  const [, setLocation] = useLocation();
  const { data: frontend, loading } = useFetch<Frontend>(`/frontends/${frontendId}`);

  const handleSubmit = async (values: any) => {
    await xior.put(`/frontends/${frontendId}`, values);
    message.success(t('frontend-updated-successfully'));
    setLocation(`/frontends/${frontendId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      </Container>
    );
  }

  if (!frontend) {
    return (
      <Container maxWidth="md">
        <Typography.Text>{t('frontend-not-found')}</Typography.Text>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/frontends">{t('frontends')}</Link> },
          { title: <Link href={`/frontends/${frontendId}`}>{frontend.name}</Link> },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>
        {t('edit-frontend')}: {frontend.name}
      </Typography.Title>

      <Card>
        <FrontendForm frontend={frontend} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
