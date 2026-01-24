import { Avatar, Card, Flex, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import Emulator from '../../types/Emulator.js';

export interface EmulatorProps {
  emulator: Emulator;
}

export default function EmulatorCard({ emulator }: EmulatorProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Meta
        avatar={
          <Avatar
            src={emulator.icon?.url}
            shape="square"
            size={56}
            style={{ border: '1px solid #ccc' }}
          />
        }
        title={
          <Flex align="center" gap={8}>
            <span>{emulator.name}</span>
            {emulator.state === 'stable' && <Tag color="green">{t('stable')}</Tag>}
            {emulator.state === 'experimental' && <Tag color="orange">{t('experimental')}</Tag>}
            {emulator.state === 'discontinued' && <Tag color="red">{t('discontinued')}</Tag>}
          </Flex>
        }
        description={
          emulator.website && (
            <a href={emulator.website} target="_blank" rel="noopener noreferrer">
              {emulator.website}
            </a>
          )
        }
      />
    </Card>
  );
}
