import { Badge, Breadcrumb, Card, Descriptions, Flex, Image, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import Emulator from '../../types/Emulator.js';

export default function EmulatorPage() {
  const { emulatorId } = useParams();
  const { t } = useTranslation();

  const { data: emulator } = useFetch<Emulator>(`/emulators/${emulatorId}`);

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

      <Typography.Title level={1}>{emulator?.name || '...'}</Typography.Title>

      <Image.PreviewGroup>
        <Flex gap={16} align="center" style={{ marginBottom: 24 }}>
          <Badge.Ribbon text={t('icon')} color="green" styles={{ root: { flex: '1 1 50%' } }}>
            {emulator?.icon ? (
              <Image src={emulator.icon.url} alt={`${emulator.name} ${t('icon')}`} />
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
            {emulator?.screenshot ? (
              <Image src={emulator.screenshot.url} alt={`${emulator.name} ${t('screenshot')}`} />
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
