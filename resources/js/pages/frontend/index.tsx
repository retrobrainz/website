import { Badge, Breadcrumb, Button, Card, Descriptions, Flex, Image, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import { EditOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/auth/index.js';
import Frontend from '../../types/Frontend.js';

export default function FrontendPage() {
  const { frontendId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: frontend } = useFetch<Frontend>(`/frontends/${frontendId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container maxWidth="lg" style={{ paddingTop: 16 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/frontends">{t('frontends')}</Link> },
          { title: frontend?.name || '...' },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {frontend?.name || '...'}
        </Typography.Title>
        {canEdit && frontend && (
          <Link href={`/frontends/${frontendId}/edit`}>
            <Button type="primary" icon={<EditOutlined />}>
              {t('edit')}
            </Button>
          </Link>
        )}
      </Flex>

      <Image.PreviewGroup>
        <Flex gap={16} align="center" style={{ marginBottom: 24 }}>
          <Badge.Ribbon text={t('icon')} color="green" styles={{ root: { flex: '1 1 50%' } }}>
            {frontend?.icon ? (
              <Image src={frontend.icon.url} alt={`${frontend.name} ${t('icon')}`} />
            ) : (
              <Flex
                justify="center"
                align="center"
                style={{ height: 150, background: '#ccc', color: '#666' }}
                aria-label="No icon available"
              >
                {t('icon')}
              </Flex>
            )}
          </Badge.Ribbon>
          <Badge.Ribbon text={t('screenshot')} color="blue" styles={{ root: { flex: '1 1 50%' } }}>
            {frontend?.screenshot ? (
              <Image src={frontend.screenshot.url} alt={`${frontend.name} ${t('screenshot')}`} />
            ) : (
              <Flex
                justify="center"
                align="center"
                style={{ height: 150, background: '#ccc', color: '#666' }}
                aria-label="No screenshot available"
              >
                {t('screenshot')}
              </Flex>
            )}
          </Badge.Ribbon>
        </Flex>
      </Image.PreviewGroup>

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
  );
}
