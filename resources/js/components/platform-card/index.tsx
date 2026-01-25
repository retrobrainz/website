import { Card, Flex } from 'antd';
import { Link } from 'wouter';

interface Platform {
  id: number;
  name: string;
  company: {
    name: string;
  };
  photo?: {
    url: string;
  };
  logo?: {
    url: string;
  };
}

interface PlatformCardProps {
  platform: Platform;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Link href={`/platforms/${platform.id}`}>
      <Card cover={<img alt={platform.name} src={platform.photo?.url} />}>
        <Flex align="center">
          <Card.Meta
            title={platform.name}
            description={platform.company.name}
            style={{ flex: 1 }}
          />
          <img
            alt={platform.name}
            src={platform.logo?.url}
            style={{ width: 'auto', height: 48, display: 'block' }}
          />
        </Flex>
      </Card>
    </Link>
  );
}
