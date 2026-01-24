import { Spin } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useParams } from 'wouter';
import Emulator from '../../types/Emulator.js';

export default function EmulatorList() {
  const { platformId } = useParams();

  const { data, loading } = useFetch<Emulator[]>(`/emulators`, {
    params: { platformId },
  });

  return (
    <div>
      <Spin spinning={loading}>
        {data?.map((emulator) => (
          <div key={emulator.id} style={{ marginBottom: 16 }}>
            <h3>{emulator.name}</h3>
            {emulator.website && (
              <p>
                <a href={emulator.website} target="_blank" rel="noopener noreferrer">
                  {emulator.website}
                </a>
              </p>
            )}
          </div>
        ))}
      </Spin>
    </div>
  );
}
