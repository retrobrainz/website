import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import xior from 'xior';
import RegionForm from '../../components/region-form';
import type Region from '../../types/Region';

export default function AdminRegionNewPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleSubmit = async (values: { name: string }) => {
    const response = await xior.post<Region>('/admin/regions', values);
    message.success(t('create-success'));
    setLocation(`/admin/regions/${response.data.id}/edit`);
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/settings">{t('settings')}</Link> },
          { title: <Link href="/admin/regions">{t('regions')}</Link> },
          { title: t('new') },
        ]}
        style={{ marginTop: 32 }}
      />

      <Typography.Title level={1}>{t('new')}</Typography.Title>

      <Card>
        <RegionForm onSubmit={handleSubmit} submitText={t('create')} />
      </Card>
    </Container>
  );
}
