import { EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Descriptions, Flex, Row, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import GameCard from '../../components/game-card/index.js';
import { useAuth } from '../../contexts/auth/index.js';
import Franchise from '../../types/Franchise.js';

export default function FranchisePage() {
  const { franchiseId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: franchise } = useFetch<Franchise>(`/franchises/${franchiseId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  return (
    <>
      <Container maxWidth="lg" style={{ paddingTop: 16 }}>
        <Breadcrumb
          items={[
            { title: <Link href="/">{t('home')}</Link> },
            { title: <Link href="/franchises">{t('franchises')}</Link> },
            { title: franchise?.name || '...' },
          ]}
          style={{ marginBottom: 16 }}
        />

        <Flex align="center" style={{ marginBottom: 16 }}>
          <Typography.Title level={1} style={{ margin: 0 }}>
            {franchise?.name || '...'}
          </Typography.Title>

          <div style={{ flex: 1 }} />

          {canEdit && (
            <Link href={`/franchises/${franchiseId}/edit`}>
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
                children: franchise?.gamesCount ?? 0,
              },
            ]}
          />
        </Card>
      </Container>

      {franchise?.games && franchise.games.length > 0 && (
        <Container maxWidth="xxl" style={{ paddingTop: 24, paddingBottom: 24 }}>
          <Typography.Title level={2} style={{ marginBottom: 16, textAlign: 'center' }}>
            {t('games')}
          </Typography.Title>
          <Row gutter={[24, 24]} justify="center">
            {franchise.games.map((game) => (
              <Col key={game.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}
