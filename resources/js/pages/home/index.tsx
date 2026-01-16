import { Card, Col, Row } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { Link } from 'wouter';

export default function HomePage() {
  const { data } = useFetch<any[]>('/platforms');

  return (
    <Container>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {data
          ?.sort((a, b) => b.gamesCount - a.gamesCount)
          ?.map((platform) => (
            <Col key={platform.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Link href={`/platforms/${platform.id}`}>
                <Card
                  cover={
                    <img
                      alt={platform.name}
                      src={`https://github.com/libretro/retroarch-assets/blob/master/xmb/systematic/png/${encodeURIComponent(`${platform.company.name} - ${platform.name}`)}.png?raw=true`}
                      width={256}
                      height={256}
                      style={{ height: 'auto', background: '#bbb' }}
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
