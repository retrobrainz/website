import { AndroidFilled, AppleFilled, LinuxOutlined, WindowsFilled } from '@ant-design/icons';
import { ReactElement } from 'react';

const iconMap: Record<string, ReactElement> = {
  Android: <AndroidFilled style={{ color: 'var(--ant-green)' }} />,
  Linux: <LinuxOutlined style={{ color: 'var(--ant-orange)' }} />,
  macOS: <AppleFilled style={{ color: 'var(--ant-gray)' }} />,
  Windows: <WindowsFilled style={{ color: 'var(--ant-blue)' }} />,
};

export interface OperatingSystemIconProps {
  name: string;
}

export default function OperatingSystemIcon({ name }: OperatingSystemIconProps) {
  return iconMap[name] || null;
}
