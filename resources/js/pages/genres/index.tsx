import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Flex, Pagination, Row, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import GenreCard from '../../components/genre-card/index.js';
import { useAuth } from '../../contexts/auth/index.js';
import Genre from '../../types/Genre.js';

export default function GenresPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const { data: genres, loading } = useFetch<{ data: Genre[]; meta: { total: number } }>(
    '/genres',
    {
      params: { page, pageSize },
    },
  );

  const canCreateGenre = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('genres') }]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('genres')}
        </Typography.Title>
        {canCreateGenre && (
          <Link href="/genres/new">
            <Button icon={<PlusOutlined />}>{t('new')}</Button>
          </Link>
        )}
      </Flex>

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {genres?.data?.map((genre) => (
            <Col key={genre.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <GenreCard genre={genre} />
            </Col>
          ))}
        </Row>
        {!loading && genres?.data?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
            {t('no-genres-found')}
          </div>
        )}

        <Flex justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={genres?.meta?.total || 0}
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
