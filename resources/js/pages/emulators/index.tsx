import { Breadcrumb, Col, Form, Row, Spin, Tag, Button, Flex, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { PlusOutlined } from '@ant-design/icons';
import EmulatorCard from '../../components/emulator-card/index.js';
import OperatingSystemIcon from '../../components/operating-system-icon/index.js';
import { useAuth } from '../../contexts/auth/index.js';
import Emulator from '../../types/Emulator.js';
import OperatingSystem from '../../types/OperatingSystem.js';
import Platform from '../../types/Platform.js';

export default function EmulatorsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: platforms } = useFetch<Platform[]>('/platforms');
  const { data: operatingSystems } = useFetch<OperatingSystem[]>('/operatingSystems');

  const [platformId, setPlatformId] = useState<number | null>(null);
  const [operatingSystemId, setOperatingSystemId] = useState<number | null>(null);

  const { data: emulators, loading } = useFetch<Emulator[]>('/emulators', {
    params: { platformId, operatingSystemId },
  });

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
            <Button type="primary" icon={<PlusOutlined />}>
              {t('new-emulator')}
            </Button>
          </Link>
        )}
      </Flex>

      <Form>
        <Form.Item label={t('platform')}>
          <Tag.CheckableTagGroup
            options={
              platforms?.map((item) => ({
                value: item.id,
                label: item.name,
              })) ?? []
            }
            value={platformId}
            onChange={setPlatformId}
          />
        </Form.Item>

        <Form.Item label={t('operating-system')}>
          <Tag.CheckableTagGroup
            options={
              operatingSystems?.map((item) => ({
                value: item.id,
                label: (
                  <span>
                    <OperatingSystemIcon name={item.name} /> {item.name} ({item.arch})
                  </span>
                ),
              })) ?? []
            }
            value={operatingSystemId}
            onChange={setOperatingSystemId}
          />
        </Form.Item>
      </Form>

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {emulators?.map((emulator) => (
            <Col key={emulator.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <EmulatorCard emulator={emulator} />
            </Col>
          ))}
        </Row>
        {!loading && emulators?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
            {t('no-emulators-found')}
          </div>
        )}
      </Spin>
    </Container>
  );
}
