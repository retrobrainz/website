import { Avatar, Card } from 'antd';
import Emulator from '../../types/Emulator.js';

export interface EmulatorProps {
  emulator: Emulator;
}

export default function EmulatorCard({ emulator }: EmulatorProps) {
  return (
    <Card title={emulator.name}>
      <Card.Meta avatar={<Avatar src={emulator.icon} />} />
      {emulator.website && (
        <p>
          <a href={emulator.website} target="_blank" rel="noopener noreferrer">
            {emulator.website}
          </a>
        </p>
      )}
    </Card>
  );
}
