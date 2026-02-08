import { EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Descriptions, Flex, Image, Row, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import fallbackScreenshot from '../../../img/fallback-screenshot.avif';
import EmulatorCard from '../../components/emulator-card';
import FavoriteButton from '../../components/favorite-button';
import { useAuth } from '../../contexts/auth';
import Frontend from '../../types/Frontend';

export default function FrontendPage() {
  const { frontendId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: frontend, reload } = useFetch<Frontend>(`/frontends/${frontendId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  return (
    <>
      <Container maxWidth="lg" style={{ paddingTop: 16 }}>
        <Breadcrumb
          items={[
            { title: <Link href="/">{t('home')}</Link> },
            { title: <Link href="/frontends">{t('frontends')}</Link> },
            { title: frontend?.name || '...' },
          ]}
          style={{ marginBottom: 16 }}
        />

        <Flex align="center" style={{ marginBottom: 16 }}>
          {frontend?.icon && (
            <img
              src={frontend.icon.url}
              width={56}
              height={56}
              alt={`${frontend.name} icon`}
              style={{ marginRight: 12 }}
            />
          )}
          <Typography.Title level={1} style={{ margin: 0 }}>
            {frontend?.name || '...'}
          </Typography.Title>

          <div style={{ flex: 1 }} />

          <FavoriteButton
            entityType="frontend"
            entityId={frontendId}
            favoritesCount={frontend?.favoritesCount ?? undefined}
            onToggle={reload}
          />

          {canEdit && (
            <Link href={`/frontends/${frontendId}/edit`}>
              <Button icon={<EditOutlined />} style={{ marginLeft: 8 }}>
                {t('edit')}
              </Button>
            </Link>
          )}
        </Flex>

        <Image
          src={frontend?.screenshot?.url || fallbackScreenshot}
          width={frontend?.screenshot?.width || 1280}
          height={frontend?.screenshot?.height || 720}
          alt={`${frontend?.name} ${t('screenshot')}`}
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
                children: frontend?.website ? (
                  <a href={frontend.website} target="_blank" rel="noopener noreferrer">
                    {frontend.website}
                  </a>
                ) : (
                  'N/A'
                ),
              },
              {
                label: t('source-code'),
                children: frontend?.sourceCode ? (
                  <a href={frontend.sourceCode} target="_blank" rel="noopener noreferrer">
                    {frontend.sourceCode}
                  </a>
                ) : (
                  'N/A'
                ),
              },
              {
                label: t('operating-systems'),
                children: frontend?.operatingSystems?.map((os) => os.name).join(', ') || 'N/A',
              },
              {
                label: t('emulators'),
                children: frontend?.emulators?.map((emulator) => emulator.name).join(', ') || 'N/A',
              },
            ]}
          />
        </Card>
      </Container>

      {frontend?.emulators && frontend.emulators.length > 0 && (
        <Container maxWidth="xxl" style={{ paddingTop: 24, paddingBottom: 24 }}>
          <Typography.Title level={2} style={{ marginBottom: 16, textAlign: 'center' }}>
            {t('emulators')}
          </Typography.Title>
          <Row gutter={[24, 24]} justify="center">
            {frontend.emulators.map((emulator) => (
              <Col key={emulator.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <EmulatorCard emulator={emulator} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}
