import { Breadcrumb, Tabs, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import EmulatorList from '../../components/emulator-list/index.js';
import GameList from '../../components/game-list/index.js';
import Platform from '../../types/Platform.js';

export default function PlatformPage() {
  const { platformId } = useParams();
  const { t } = useTranslation();

  const { data: platform } = useFetch<Platform>(`/platforms/${platformId}`);

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

      <Typography.Title level={1}>{platform?.name || '...'}</Typography.Title>

      <Tabs
        items={[
          {
            key: 'games',
            label: t('games'),
            children: (
              <GameList
                initialFilters={{ platformId: Number(platformId) }}
                showFilters={['search', 'regionId', 'languageId']}
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
