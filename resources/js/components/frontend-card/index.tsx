import { Card, Flex, Tag } from 'antd';
import Frontend from '../../types/Frontend.js';
import OperatingSystemIcon from '../operating-system-icon/index.js';

export interface FrontendCardProps {
  frontend: Frontend;
}

export default function FrontendCard({ frontend }: FrontendCardProps) {
  return (
    <Card
      cover={
        frontend.screenshot && (
          <img
            src={frontend.screenshot.url}
            alt={frontend.name}
            style={{ height: 200, objectFit: 'cover' }}
          />
        )
      }
    >
      <Card.Meta
        avatar={
          frontend.icon && (
            <img src={frontend.icon.url} width={56} height={56} style={{ display: 'block' }} />
          )
        }
        title={frontend.name}
        description={
          frontend.website && (
            <a href={frontend.website} target="_blank" rel="noopener noreferrer">
              {frontend.website}
            </a>
          )
        }
      />
      <Flex wrap="wrap" gap={8} style={{ marginTop: 16 }}>
        {frontend.operatingSystems?.map((item) => (
          <Tag key={item.id} icon={<OperatingSystemIcon name={item.name} />}>
            {item.name} ({item.arch})
          </Tag>
        ))}
      </Flex>
    </Card>
  );
}
