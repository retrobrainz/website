import { EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Descriptions, Flex, Image, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import fallbackScreenshot from '../../../img/fallback-screenshot.avif';
import { useAuth } from '../../contexts/auth/index.js';
import Emulator from '../../types/Emulator.js';

export default function EmulatorPage() {
  const { emulatorId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: emulator } = useFetch<Emulator>(`/emulators/${emulatorId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container maxWidth="lg" style={{ paddingTop: 16 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/emulators">{t('emulators')}</Link> },
          { title: emulator?.name || '...' },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex align="center" style={{ marginBottom: 16 }}>
        {emulator?.icon && (
          <img
            src={emulator.icon.url}
            width={56}
            height={56}
            alt={`${emulator.name} icon`}
            style={{ marginRight: 16 }}
          />
        )}
        <Typography.Title level={1} style={{ margin: 0 }}>
          {emulator?.name || '...'}
        </Typography.Title>

        <div style={{ flex: 1 }} />

        {canEdit && (
          <Link href={`/emulators/${emulatorId}/edit`}>
            <Button icon={<EditOutlined />}>{t('edit')}</Button>
          </Link>
        )}
      </Flex>

      <Image
        src={emulator?.screenshot?.url || fallbackScreenshot}
        width={emulator?.screenshot?.width || 1280}
        height={emulator?.screenshot?.height || 720}
        alt={`${emulator?.name} ${t('screenshot')}`}
        style={{ width: '100%', height: 'auto' }}
        styles={{
          root: {
            width: '100%',
            height: 'auto',
            marginBottom: 16,
            borderRadius: 8,
            overflow: 'hidden',
          },
        }}
      />

      <Card style={{ marginBottom: 24 }}>
        <Descriptions
          column={2}
          items={[
            {
              label: t('website'),
              children: emulator?.website ? (
                <a href={emulator.website} target="_blank" rel="noopener noreferrer">
                  {emulator.website}
                </a>
              ) : (
                'N/A'
              ),
            },
            {
              label: t('state'),
              children: emulator?.state ? t(emulator.state) : 'N/A',
            },
            {
              label: t('release-date'),
              children: emulator?.releaseDate || 'N/A',
            },
            {
              label: t('platforms'),
              children: emulator?.platforms?.map((platform) => platform.name).join(', ') || 'N/A',
            },
            {
              label: t('operating-systems'),
              children: emulator?.operatingSystems?.map((os) => os.name).join(', ') || 'N/A',
            },
            {
              label: t('frontends'),
              children: emulator?.frontends?.map((frontend) => frontend.name).join(', ') || 'N/A',
            },
          ]}
        />
      </Card>
    </Container>
  );
}
