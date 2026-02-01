import { ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import GameCard from '../../components/game-card/index.js';
import type Game from '../../types/Game.js';

export default function RandomGames() {
  const { t } = useTranslation();

  const { data, reload } = useFetch<{ data: Game[] }>('/games', {
    params: { orderBy: 'random', pageSize: 12 },
  });

  return (
    <>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('random-games')}
        </Typography.Title>
        <Button icon={<ReloadOutlined />} onClick={reload}>
          {t('refresh')}
        </Button>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {data?.data.map((game) => (
          <Col key={game.id} xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>
    </>
  );
}
