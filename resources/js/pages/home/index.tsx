import { Card, Col, Row } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { Link } from 'wouter';

export default function HomePage() {
  const { data } = useFetch<any[]>('/platforms');

  return (
    <Container style={{ paddingTop: 24 }}>
      <Row gutter={[24, 24]}>
        {data
          ?.sort((a, b) => b.gamesCount - a.gamesCount)
          ?.map((platform) => (
            <Col key={platform.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Link href={`/platforms/${platform.id}`}>
                <Card
                  cover={
                    <img
                      alt={platform.name}
                      src={`/static/img/${encodeURIComponent(`${platform.company.name} - ${platform.name}`)}.png`}
                      width={256}
                      height={256}
                      style={{ height: 'auto', background: '#442c5d' }}
                    />
                  }
                >
                  <Card.Meta title={platform.name} description={platform.company.name} />
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
