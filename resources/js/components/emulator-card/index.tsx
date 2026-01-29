import { Card, Flex, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import Emulator from '../../types/Emulator.js';
import OperatingSystemIcon from '../operating-system-icon/index.js';

export interface EmulatorProps {
  emulator: Emulator;
}

export default function EmulatorCard({ emulator }: EmulatorProps) {
  const { t } = useTranslation();
  return (
    <Link href={`/emulators/${emulator.id}`}>
      <Card
        cover={
          emulator.screenshot && (
            <img
              src={emulator.screenshot.url}
              width={emulator.screenshot.width}
              height={emulator.screenshot.height}
              style={{ width: '100%', height: 'auto' }}
            />
          )
        }
      >
        <Card.Meta
          avatar={
            <img src={emulator.icon?.url} width={56} height={56} style={{ display: 'block' }} />
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
        <Flex wrap="wrap" gap={8} style={{ marginTop: 16 }}>
          {emulator.operatingSystems?.map((item) => (
            <Tag key={item.id} icon={<OperatingSystemIcon name={item.name} />}>
              {item.name} ({item.arch})
            </Tag>
          ))}
        </Flex>
      </Card>
    </Link>
  );
}
