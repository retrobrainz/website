import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Descriptions, Flex, Row, Tabs, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import EmulatorList from '../../components/emulator-list';
import GameList from '../../components/game-list';
import WikipediaExcerpt from '../../components/wikipedia-excerpt';
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
          {platform?.abbr && <span style={{ marginLeft: 12 }}>({platform.abbr})</span>}
        </Typography.Title>
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

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col xs={24} md={12} xl={16} xxl={18}>
            <WikipediaExcerpt url={platform?.wikipedia} />
          </Col>
          <Col xs={24} md={12} xl={8} xxl={6}>
            <Descriptions
              column={1}
              items={[
                {
                  label: t('abbr'),
                  children: platform?.abbr,
                  hidden: !platform?.abbr,
                },
                {
                  label: t('wikipedia'),
                  children: platform?.wikipedia && (
                    <a href={platform.wikipedia} target="_blank" rel="noreferrer">
                      {platform.wikipedia}
                    </a>
                  ),
                  hidden: !platform?.wikipedia,
                },
                {
                  label: t('companies'),
                  children: platform?.company && (
                    <Link href={`/companies/${platform.company.id}`}>{platform.company.name}</Link>
                  ),
                  hidden: !platform?.company,
                },
                {
                  label: t('release-date'),
                  children: platform?.releaseDate,
                  hidden: !platform?.releaseDate,
                },
                {
                  label: t('screen-width'),
                  children: platform?.screenWidth,
                  hidden: !platform?.screenWidth,
                },
                {
                  label: t('screen-height'),
                  children: platform?.screenHeight,
                  hidden: !platform?.screenHeight,
                },
              ].filter((item) => !item.hidden)}
            />
          </Col>
        </Row>
      </Card>

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
