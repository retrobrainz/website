import { Col, Row } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import PlatformCard from '../../components/platform-card/index.js';

export default function HomePage() {
  const { data } = useFetch<any[]>('/platforms');

  return (
    <Container style={{ paddingTop: 24 }}>
      <Row gutter={[24, 24]}>
        {data
          ?.sort((a, b) => b.gamesCount - a.gamesCount)
          ?.map((platform) => (
            <Col key={platform.id} xs={24} sm={12} md={8} lg={6}>
              <PlatformCard platform={platform} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
