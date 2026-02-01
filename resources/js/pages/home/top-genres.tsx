import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import GenreCard from '../../components/genre-card/index.js';
import type Genre from '../../types/Genre.js';

export default function TopGenres() {
  const { t } = useTranslation();
  const { data: genres } = useFetch<{ data: Genre[] }>('/genres', {
    params: { page: 1, pageSize: 12 },
  });

  return (
    <>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('genres')}
        </Typography.Title>
        <Link href="/genres">
          <Button type="text" icon={<ArrowRightOutlined />}>
            {t('more')}
          </Button>
        </Link>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {genres?.data.map((genre) => (
          <Col key={genre.id} xs={24} md={12} xl={8} xxl={4}>
            <GenreCard genre={genre} />
          </Col>
        ))}
      </Row>
    </>
  );
}
