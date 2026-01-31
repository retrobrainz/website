import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import xior from 'xior';
import FranchiseForm from '../../components/franchise-form/index.js';
import Franchise from '../../types/Franchise.js';

export default function FranchiseNewPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleSubmit = async (values: any) => {
    const response = await xior.post<Franchise>('/franchises', values);
    message.success(t('franchise-created-successfully'));
    setLocation(`/franchises/${response.data.id}`);
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <a href="/">{t('home')}</a> },
          { title: <a href="/franchises">{t('franchises')}</a> },
          { title: t('new') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>{t('new-franchise')}</Typography.Title>

      <Card>
        <FranchiseForm onSubmit={handleSubmit} submitText={t('create')} />
      </Card>
    </Container>
  );
}
