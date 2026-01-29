import { AndroidFilled, AppleFilled, LinuxOutlined, WindowsFilled } from '@ant-design/icons';
import { ReactElement } from 'react';

const iconMap: Record<string, ReactElement> = {
  Android: <AndroidFilled style={{ color: 'var(--ant-green)' }} />,
  iOS: <AppleFilled style={{ color: 'var(--ant-gray)' }} />,
  Linux: <LinuxOutlined style={{ color: 'var(--ant-orange)' }} />,
  macOS: <AppleFilled style={{ color: 'var(--ant-gray)' }} />,
  Windows: <WindowsFilled style={{ color: 'var(--ant-blue)' }} />,
};

export interface OperatingSystemIconProps {
  name: string;
}

export default function OperatingSystemIcon({ name, ...rest }: OperatingSystemIconProps) {
  return <span {...rest}>{iconMap[name] || null}</span>;
}
