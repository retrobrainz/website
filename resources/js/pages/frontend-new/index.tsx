import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import xior from 'xior';
import FrontendForm from '../../components/frontend-form/index.js';

export default function FrontendNewPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleSubmit = async (values: any) => {
    const response = await xior.post('/frontends', values);
    message.success(t('frontend-created-successfully'));
    setLocation(`/frontends`);
    return response.data;
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <a href="/">{t('home')}</a> },
          { title: <a href="/frontends">{t('frontends')}</a> },
          { title: t('new') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>{t('new-frontend')}</Typography.Title>

      <Card>
        <FrontendForm onSubmit={handleSubmit} submitText={t('create')} />
      </Card>
    </Container>
  );
}
