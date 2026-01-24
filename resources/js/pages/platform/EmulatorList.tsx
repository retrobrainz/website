import { Col, Row, Spin } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useParams } from 'wouter';
import EmulatorCard from '../../components/emulator-card/index.js';
import Emulator from '../../types/Emulator.js';

export default function EmulatorList() {
  const { platformId } = useParams();

  const { data, loading } = useFetch<Emulator[]>(`/emulators`, {
    params: { platformId },
  });

  return (
    <div>
      <Spin spinning={loading}>
        <Row>
          {data?.map((emulator) => (
            <Col key={emulator.id} span={6} style={{ padding: 8 }}>
              <EmulatorCard emulator={emulator} />
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
}
