import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import RegionForm from '../../components/region-form';
import type Region from '../../types/Region';

export default function AdminRegionEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { regionId } = useParams<{ regionId: string }>();
  const [, setLocation] = useLocation();
  const { data: region } = useFetch<Region>(`/admin/regions/${regionId}`);

  const handleSubmit = async (values: { name: string }) => {
    await xior.put(`/admin/regions/${regionId}`, values);
    message.success(t('update-success'));
    setLocation('/admin/regions');
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/settings">{t('settings')}</Link> },
          { title: <Link href="/admin/regions">{t('regions')}</Link> },
          { title: region?.name || '...' },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />

      <Typography.Title level={1}>
        {t('edit')}: {region?.name || '...'}
      </Typography.Title>

      <Card>
        <RegionForm region={region} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
