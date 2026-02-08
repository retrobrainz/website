import { Card, Flex, Tag, Tooltip } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import fallbackScreenshot from '../../../img/fallback-screenshot.avif';
import Emulator from '../../types/Emulator';
import OperatingSystemIcon from '../operating-system-icon';

export interface EmulatorProps {
  emulator: Emulator;
}

export default function EmulatorCard({ emulator }: EmulatorProps) {
  const { t } = useTranslation();

  const osNames = useMemo(() => {
    const names = new Set<string>();
    emulator.operatingSystems?.forEach((os) => {
      names.add(os.name);
    });
    return Array.from(names);
  }, [emulator.operatingSystems]);

  return (
    <Link href={`/emulators/${emulator.id}`}>
      <Card
        hoverable
        cover={
          <img
            src={emulator.screenshot?.url || fallbackScreenshot}
            alt={`${emulator.name} screenshot`}
            width={emulator.screenshot?.width || 1280}
            height={emulator.screenshot?.height || 720}
            style={{ width: '100%', height: 'auto' }}
          />
        }
      >
        <Card.Meta
          avatar={
            <img
              src={emulator.icon?.url}
              alt={`${emulator.name} icon`}
              width={56}
              height={56}
              style={{ display: 'block' }}
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
            <Flex wrap="wrap" gap={8} style={{ fontSize: 16 }}>
              {osNames.map((name) => (
                <Tooltip key={name} title={name}>
                  <OperatingSystemIcon key={name} name={name} />
                </Tooltip>
              ))}
            </Flex>
          }
        />
      </Card>
    </Link>
  );
}
