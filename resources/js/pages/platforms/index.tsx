import { Breadcrumb, Col, Flex, Row, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import PlatformCard from '../../components/platform-card/index.js';

export default function PlatformsPage() {
  const { t } = useTranslation();
  const { data } = useFetch<any[]>('/platforms');

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('platforms') }]}
        style={{ marginBottom: 16 }}
      />

      <Flex align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('platforms')}
        </Typography.Title>
      </Flex>

      <Row gutter={[24, 24]}>
        {data
          ?.sort((a, b) => b.gamesCount - a.gamesCount)
          ?.map((platform) => (
            <Col key={platform.id} xs={24} md={12} xl={8} xxl={6}>
              <PlatformCard platform={platform} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
