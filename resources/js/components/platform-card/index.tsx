import { Card, Flex, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import Platform from '../../types/Platform.js';

interface PlatformCardProps {
  platform: Platform;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/platforms/${platform.id}`}>
      <Card
        cover={
          <img
            alt={platform.name}
            src={platform.photo?.url}
            width={platform.photo?.width}
            height={platform.photo?.height}
            style={{ height: 'auto' }}
          />
        }
      >
        <Flex align="center">
          <Card.Meta
            title={platform.name}
            description={
              <Space separator="|">
                <span>{platform.company?.name}</span>
                <span>{t('total-games', { total: platform.gamesCount })}</span>
              </Space>
            }
            style={{ flex: 1 }}
          />
          <img
            alt={platform.name}
            src={platform.logo?.url}
            width={platform.logo?.width}
            height={platform.logo?.height}
            style={{
              maxWidth: 128,
              maxHeight: 48,
              display: 'block',
              width: 'auto',
              height: 'auto',
            }}
          />
        </Flex>
      </Card>
    </Link>
  );
}
