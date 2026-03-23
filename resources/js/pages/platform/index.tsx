import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Flex, Tabs, Tag, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import EmulatorList from '../../components/emulator-list';
import GameList from '../../components/game-list';
import { useAuth } from '../../contexts/auth';
import Platform from '../../types/Platform';

export default function PlatformPage() {
  const { platformId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: platform } = useFetch<Platform>(`/platforms/${platformId}`);
  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/platforms">{t('platforms')}</Link> },
          { title: platform?.name || '...' },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {platform?.name || '...'}
        </Typography.Title>
        {platform?.abbr && <Tag style={{ marginLeft: 12 }}>{platform.abbr}</Tag>}
        <div style={{ flex: 1 }} />
        {canEdit && (
          <Flex gap="small">
            <Link href={`/platforms/${platformId}/games/new`}>
              <Button icon={<PlusOutlined />}>{t('new')}</Button>
            </Link>
            <Link href={`/platforms/${platformId}/edit`}>
              <Button icon={<EditOutlined />}>{t('edit')}</Button>
            </Link>
          </Flex>
        )}
      </Flex>

      <Tabs
        items={[
          {
            key: 'games',
            label: t('games'),
            children: (
              <GameList
                initialFilters={{ platformId: Number(platformId) }}
                showFilters={[
                  'search',
                  'regionId',
                  'languageId',
                  'noDeveloper',
                  'noPublisher',
                  'noReleaseDate',
                  'noLanguage',
                  'noRom',
                ]}
              />
            ),
          },
          {
            key: 'emulators',
            label: t('emulators'),
            children: (
              <EmulatorList initialFilters={{ platformId }} showFilters={['operatingSystemId']} />
            ),
          },
        ]}
      />
    </Container>
  );
}
