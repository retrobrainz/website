import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Flex, Row, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import GenreCard from '../../components/genre-card/index.js';
import { useAuth } from '../../contexts/auth/index.js';
import Genre from '../../types/Genre.js';

export default function GenresPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: genres, loading } = useFetch<{ data: Genre[] }>('/genres', {
    params: { pageSize: 100 },
  });

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
            <Button icon={<PlusOutlined />}>{t('new-genre')}</Button>
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
      </Spin>
    </Container>
  );
}
