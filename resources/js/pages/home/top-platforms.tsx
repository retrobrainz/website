import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import PlatformCard from '../../components/platform-card';
import type Platform from '../../types/Platform';

export default function TopPlatforms() {
  const { t } = useTranslation();
  const { data: platforms } = useFetch<Platform[]>('/platforms');

  const topPlatforms = platforms
    ?.sort((a, b) => (b.gamesCount || 0) - (a.gamesCount || 0))
    .slice(0, 6);

  return (
    <>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('platforms')}
        </Typography.Title>
        <Link href="/platforms">
          <Button type="text" icon={<ArrowRightOutlined />}>
            {t('more')}
          </Button>
        </Link>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {topPlatforms?.map((platform) => (
          <Col key={platform.id} xs={24} md={12} xl={8} xxl={4}>
            <PlatformCard platform={platform} />
          </Col>
        ))}
      </Row>
    </>
  );
}
