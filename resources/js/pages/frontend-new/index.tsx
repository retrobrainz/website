import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import xior from 'xior';
import FrontendForm from '../../components/frontend-form';

export default function FrontendNewPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleSubmit = async (values: any) => {
    const response = await xior.post('/frontends', values);
    message.success(t('create-success'));
    setLocation(`/frontends/${response.data.id}`);
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/frontends">{t('frontends')}</Link> },
          { title: t('new') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>{t('new')}</Typography.Title>

      <Card>
        <FrontendForm onSubmit={handleSubmit} submitText={t('create')} />
      </Card>
    </Container>
  );
}
