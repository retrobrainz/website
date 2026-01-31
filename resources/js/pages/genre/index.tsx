import { EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Flex, Pagination, Row, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import GameCard from '../../components/game-card/index.js';
import { useAuth } from '../../contexts/auth/index.js';
import Game from '../../types/Game.js';
import Genre from '../../types/Genre.js';

export default function GenrePage() {
  const { genreId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const { data: genre } = useFetch<Genre>(`/genres/${genreId}`);
  const { data: games } = useFetch<{ data: Game[]; meta: { total: number } }>(
    `/genres/${genreId}/games`,
    {
      params: { page, pageSize },
    },
  );

  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/genres">{t('genres')}</Link> },
          { title: genre?.name || '...' },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {genre?.name || '...'}
        </Typography.Title>

        <div style={{ flex: 1 }} />

        {canEdit && (
          <Link href={`/genres/${genreId}/edit`}>
            <Button icon={<EditOutlined />}>{t('edit')}</Button>
          </Link>
        )}
      </Flex>

      <Row gutter={[24, 24]} justify="center">
        {games?.data.map((game) => (
          <Col key={game.id} xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>

      <Flex justify="center" style={{ marginTop: 24 }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={games?.meta.total ?? 0}
          onChange={(p, ps) => {
            setPage(p);
            setPageSize(ps);
          }}
          showSizeChanger
          pageSizeOptions={[12, 24, 36, 48]}
          hideOnSinglePage
        />
      </Flex>
    </Container>
  );
}
