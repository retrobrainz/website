import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Flex, Pagination, Row, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import FranchiseCard from '../../components/franchise-card';
import { useAuth } from '../../contexts/auth';
import Franchise from '../../types/Franchise';

export default function FranchisesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const { data: franchises, loading } = useFetch<{ data: Franchise[]; meta: { total: number } }>(
    '/franchises',
    {
      params: { page, pageSize },
    },
  );

  const canCreateFranchise = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('franchises') }]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('franchises')}
        </Typography.Title>
        {canCreateFranchise && (
          <Link href="/franchises/new">
            <Button icon={<PlusOutlined />}>{t('new')}</Button>
          </Link>
        )}
      </Flex>

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {franchises?.data?.map((franchise) => (
            <Col key={franchise.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <FranchiseCard franchise={franchise} />
            </Col>
          ))}
        </Row>
        {!loading && franchises?.data?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
            {t('not-found')}
          </div>
        )}

        <Flex justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={franchises?.meta?.total || 0}
            onChange={(p, ps) => {
              setPage(p);
              setPageSize(ps);
            }}
            showSizeChanger
          />
        </Flex>
      </Spin>
    </Container>
  );
}
