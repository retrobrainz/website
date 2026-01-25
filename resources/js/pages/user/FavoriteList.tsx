import { Col, Pagination, Row } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useParams } from 'wouter';
import GameCard from '../../components/game-card/index.js';
import Favorite from '../../types/Favorite.js';

export default function FavoriteList() {
  const { userId } = useParams();

  const [page, setPage] = useState(1);

  const { data } = useFetch<{ data: Favorite[]; meta: { total: number } }>('/favorites', {
    params: { userId, pageSize: 24, page },
  });

  return (
    <div>
      <Row gutter={[24, 24]} justify="center" style={{ marginBottom: 24 }}>
        {data?.data.map((favorite) => (
          <Col key={favorite.id} xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
            <GameCard game={favorite.game!} />
          </Col>
        ))}
      </Row>

      <Pagination
        current={page}
        onChange={setPage}
        total={data?.meta.total}
        align="center"
        hideOnSinglePage
      />
    </div>
  );
}
