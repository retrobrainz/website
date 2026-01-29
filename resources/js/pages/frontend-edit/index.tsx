import { App, Breadcrumb, Card, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'wouter';
import xior from 'xior';
import FrontendForm from '../../components/frontend-form/index.js';
import { useFetch } from 'react-fast-fetch';
import type Frontend from '../../types/Frontend.js';

export default function FrontendEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { frontendId } = useParams<{ frontendId: string }>();
  const [, setLocation] = useLocation();
  const { data: frontend, loading } = useFetch<Frontend>(`/frontends/${frontendId}`);

  const handleSubmit = async (values: any) => {
    const response = await xior.put(`/frontends/${frontendId}`, values);
    message.success(t('frontend-updated-successfully'));
    setLocation(`/frontends`);
    return response.data;
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
          { title: <a href="/">{t('home')}</a> },
          { title: <a href="/frontends">{t('frontends')}</a> },
          { title: frontend.name },
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
