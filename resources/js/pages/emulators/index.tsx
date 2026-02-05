import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Flex, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import EmulatorList from '../../components/emulator-list/index.js';
import { useAuth } from '../../contexts/auth/index.js';

export default function EmulatorsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const canCreateEmulator = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('emulators') }]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('emulators')}
        </Typography.Title>
        {canCreateEmulator && (
          <Link href="/emulators/new">
            <Button icon={<PlusOutlined />}>{t('new')}</Button>
          </Link>
        )}
      </Flex>

      <EmulatorList showFilters={['platformId', 'operatingSystemId']} />
    </Container>
  );
}
