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
        <Row gutter={[24, 24]}>
          {data?.map((emulator) => (
            <Col key={emulator.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <EmulatorCard emulator={emulator} />
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
}
