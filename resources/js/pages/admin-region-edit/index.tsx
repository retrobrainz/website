import { TranslationOutlined } from '@ant-design/icons';
import { App, Breadcrumb, Button, Card, Flex, Typography } from 'antd';
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
  const displayName = region?.translations?.[0]?.name || region?.name || '...';

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
          { title: displayName },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('edit')}: {displayName}
        </Typography.Title>

        <Link href={`/admin/regions/${regionId}/translate`}>
          <Button icon={<TranslationOutlined />}>{t('translate')}</Button>
        </Link>
      </Flex>

      <Card>
        <RegionForm region={region} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
