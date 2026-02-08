import { App, Breadcrumb, Card, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import FranchiseForm from '../../components/franchise-form';
import type Franchise from '../../types/Franchise';

export default function FranchiseEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { franchiseId } = useParams<{ franchiseId: string }>();
  const [, setLocation] = useLocation();
  const { data: franchise, loading } = useFetch<Franchise>(`/franchises/${franchiseId}`);

  const handleSubmit = async (values: any) => {
    await xior.put(`/franchises/${franchiseId}`, values);
    message.success(t('update-success'));
    setLocation(`/franchises/${franchiseId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      </Container>
    );
  }

  if (!franchise) {
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
          { title: <Link href="/franchises">{t('franchises')}</Link> },
          { title: <Link href={`/franchises/${franchiseId}`}>{franchise.name}</Link> },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>
        {t('edit')}: {franchise.name}
      </Typography.Title>

      <Card>
        <FranchiseForm franchise={franchise} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
