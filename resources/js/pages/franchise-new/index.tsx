import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
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
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/franchises">{t('franchises')}</Link> },
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
