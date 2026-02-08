import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Flex, Pagination, Row, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import TitleCard from '../../components/title-card';
import { useAuth } from '../../contexts/auth';
import Title from '../../types/Title';

export default function TitlesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const { data: titles, loading } = useFetch<{ data: Title[]; meta: { total: number } }>(
    '/titles',
    {
      params: { page, pageSize },
    },
  );

  const canCreateTitle = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('titles') }]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('titles')}
        </Typography.Title>
        {canCreateTitle && (
          <Link href="/titles/new">
            <Button icon={<PlusOutlined />}>{t('new')}</Button>
          </Link>
        )}
      </Flex>

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {titles?.data?.map((title) => (
            <Col key={title.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <TitleCard title={title} />
            </Col>
          ))}
        </Row>
        {!loading && titles?.data?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
            {t('not-found')}
          </div>
        )}

        <Flex justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={titles?.meta?.total || 0}
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
