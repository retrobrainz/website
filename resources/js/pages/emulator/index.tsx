import { EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Descriptions, Flex, Image, Row, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import fallbackScreenshot from '../../../img/fallback-screenshot.avif';
import FavoriteButton from '../../components/favorite-button';
import FrontendCard from '../../components/frontend-card';
import { useAuth } from '../../contexts/auth';
import Emulator from '../../types/Emulator';

export default function EmulatorPage() {
  const { emulatorId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: emulator, reload } = useFetch<Emulator>(`/emulators/${emulatorId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  return (
    <>
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
              style={{ marginRight: 12 }}
            />
          )}
          <Typography.Title level={1} style={{ margin: 0 }}>
            {emulator?.name || '...'}
          </Typography.Title>

          <div style={{ flex: 1 }} />

          <FavoriteButton
            entityType="emulator"
            entityId={emulatorId}
            favoritesCount={emulator?.favoritesCount ?? undefined}
            onToggle={reload}
          />

          {canEdit && (
            <Link href={`/emulators/${emulatorId}/edit`}>
              <Button icon={<EditOutlined />} style={{ marginLeft: 8 }}>
                {t('edit')}
              </Button>
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
                label: t('source-code'),
                children: emulator?.sourceCode ? (
                  <a href={emulator.sourceCode} target="_blank" rel="noopener noreferrer">
                    {emulator.sourceCode}
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

      {emulator?.frontends && emulator.frontends.length > 0 && (
        <Container maxWidth="xxl" style={{ paddingTop: 24, paddingBottom: 24 }}>
          <Typography.Title level={2} style={{ marginBottom: 16, textAlign: 'center' }}>
            {t('frontends')}
          </Typography.Title>
          <Row gutter={[24, 24]} justify="center">
            {emulator.frontends.map((frontend) => (
              <Col key={frontend.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <FrontendCard frontend={frontend} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}
