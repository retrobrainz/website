import { PlusOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Flex,
  Input,
  Pagination,
  Row,
  Spin,
  Typography,
} from 'antd';
import { Container } from 'antd-moe';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import GenreCard from '../../components/genre-card';
import { useAuth } from '../../contexts/auth';
import Genre from '../../types/Genre';

export default function GenresPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [search, setSearch] = useState('');
  const [noWikipedia, setNoWikipedia] = useState(false);

  const { data: genres, loading } = useFetch<{ data: Genre[]; meta: { total: number } }>(
    '/genres',
    {
      params: { page, pageSize, search, noWikipedia: noWikipedia || undefined },
    },
  );

  useEffect(() => {
    setPage(1);
  }, [search, noWikipedia]);

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

      <Input.Search
        placeholder={t('search')}
        onSearch={setSearch}
        style={{ marginBottom: 16 }}
        allowClear
      />

      <div style={{ marginBottom: 24 }}>
        <Checkbox checked={noWikipedia} onChange={(e) => setNoWikipedia(e.target.checked)}>
          {t('no-wikipedia')}
        </Checkbox>
      </div>

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {genres?.data?.map((genre) => (
            <Col key={genre.id} xs={24} md={12} xl={8} xxl={6} xxxl={4}>
              <GenreCard genre={genre} />
            </Col>
          ))}
        </Row>
        {!loading && genres?.data?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
            {t('not-found')}
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
