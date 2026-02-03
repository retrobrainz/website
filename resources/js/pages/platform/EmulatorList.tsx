import OperatingSystem from '#models/operating_system';
import { Col, Form, Row, Spin, Tag } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { useParams } from 'wouter';
import EmulatorCard from '../../components/emulator-card/index.js';
import OperatingSystemIcon from '../../components/operating-system-icon/index.js';
import Emulator from '../../types/Emulator.js';

export default function EmulatorList() {
  const { platformId } = useParams();
  const { t } = useTranslation();

  const { data: operatingSystems } = useFetch<OperatingSystem[]>('/operatingSystems');
  const [operatingSystemId, setOperatingSystemId] = useState<number | null>(null);

  const { data, loading } = useFetch<{ data: Emulator[] }>(`/emulators`, {
    params: { platformId, operatingSystemId },
  });

  return (
    <div>
      <Form>
        <Form.Item label={t('operating-system')}>
          <Tag.CheckableTagGroup
            options={operatingSystems?.map((item) => ({
              value: item.id,
              label: (
                <span>
                  <OperatingSystemIcon name={item.name} /> {item.name} ({item.arch})
                </span>
              ),
            }))}
            value={operatingSystemId}
            onChange={setOperatingSystemId}
          />
        </Form.Item>
      </Form>
      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {data?.data?.map((emulator) => (
            <Col key={emulator.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <EmulatorCard emulator={emulator} />
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
}
