import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Flex, Form, Row, Spin, Tag, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import FrontendCard from '../../components/frontend-card/index.js';
import OperatingSystemIcon from '../../components/operating-system-icon/index.js';
import { useAuth } from '../../contexts/auth/index.js';
import Frontend from '../../types/Frontend.js';
import OperatingSystem from '../../types/OperatingSystem.js';

export default function FrontendsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: operatingSystems } = useFetch<OperatingSystem[]>('/operatingSystems');
  const [operatingSystemId, setOperatingSystemId] = useState<number | null>(null);

  const { data, loading } = useFetch<{ data: Frontend[] }>('/frontends', {
    params: { operatingSystemId, pageSize: 24 },
  });

  const canCreateFrontend = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('frontends') }]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('frontends')}
        </Typography.Title>
        {canCreateFrontend && (
          <Link href="/frontends/new">
            <Button icon={<PlusOutlined />}>{t('new')}</Button>
          </Link>
        )}
      </Flex>

      <Form>
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
          {data?.data.map((frontend) => (
            <Col key={frontend.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <FrontendCard frontend={frontend} />
            </Col>
          ))}
        </Row>
      </Spin>
    </Container>
  );
}
