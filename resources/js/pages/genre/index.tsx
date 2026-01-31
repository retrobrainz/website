import { EditOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Pagination,
  Row,
  Typography,
} from 'antd';
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
    <>
      <Container maxWidth="lg" style={{ paddingTop: 16 }}>
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

        <Card style={{ marginBottom: 24 }}>
          <Descriptions
            column={1}
            items={[
              {
                label: t('games-count'),
                children: genre?.gamesCount ?? 0,
              },
            ]}
          />
        </Card>
      </Container>

      {games && games.data.length > 0 && (
        <Container maxWidth="xxl" style={{ paddingTop: 24, paddingBottom: 24 }}>
          <Typography.Title level={2} style={{ marginBottom: 16, textAlign: 'center' }}>
            {t('games')}
          </Typography.Title>
          <Row gutter={[24, 24]} justify="center">
            {games.data.map((game) => (
              <Col key={game.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <GameCard game={game} />
              </Col>
            ))}
          </Row>

          <Flex justify="center" style={{ marginTop: 24 }}>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={games.meta.total}
              onChange={(p, ps) => {
                setPage(p);
                setPageSize(ps);
              }}
              showSizeChanger
            />
          </Flex>
        </Container>
      )}
    </>
  );
}
