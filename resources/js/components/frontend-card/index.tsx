import { Card, Flex, Tooltip } from 'antd';
import { useMemo } from 'react';
import fallbackScreenshot from '../../../img/fallback-screenshot.avif';
import Frontend from '../../types/Frontend.js';
import OperatingSystemIcon from '../operating-system-icon/index.js';

export interface FrontendCardProps {
  frontend: Frontend;
}

export default function FrontendCard({ frontend }: FrontendCardProps) {
  const osNames = useMemo(() => {
    const names = new Set<string>();
    frontend.operatingSystems?.forEach((os) => {
      names.add(os.name);
    });
    return Array.from(names);
  }, [frontend.operatingSystems]);

  return (
    <Card
      cover={
        <img
          src={frontend.screenshot?.url || fallbackScreenshot}
          alt={`${frontend.name} screenshot`}
          width={frontend.screenshot?.width || 1280}
          height={frontend.screenshot?.height || 720}
          style={{ width: '100%', height: 'auto' }}
        />
      }
    >
      <Card.Meta
        avatar={
          frontend.icon && (
            <img
              src={frontend.icon.url}
              alt={`${frontend.name} icon`}
              width={56}
              height={56}
              style={{ display: 'block' }}
            />
          )
        }
        title={frontend.name}
        description={
          osNames.length > 0 && (
            <Flex wrap="wrap" gap={8} style={{ fontSize: 16 }}>
              {osNames.map((name) => (
                <Tooltip key={name} title={name}>
                  <OperatingSystemIcon name={name} />
                </Tooltip>
              ))}
            </Flex>
          )
        }
      />
    </Card>
  );
}
