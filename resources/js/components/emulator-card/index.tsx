import { Avatar, Card } from 'antd';
import Emulator from '../../types/Emulator.js';

export interface EmulatorProps {
  emulator: Emulator;
}

export default function EmulatorCard({ emulator }: EmulatorProps) {
  return (
    <Card>
      <Card.Meta
        avatar={<Avatar src={emulator.icon?.url} />}
        title={emulator.name}
        description={
          emulator.website && (
            <p>
              <a href={emulator.website} target="_blank" rel="noopener noreferrer">
                {emulator.website}
              </a>
            </p>
          )
        }
      />
    </Card>
  );
}
