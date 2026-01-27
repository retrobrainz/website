import { Col, Form, Row, Spin, Tag } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import FrontendCard from '../../components/frontend-card/index.js';
import OperatingSystemIcon from '../../components/operating-system-icon/index.js';
import Frontend from '../../types/Frontend.js';
import OperatingSystem from '../../types/OperatingSystem.js';

export default function FrontendsPage() {
  const { t } = useTranslation();
  const { data: operatingSystems } = useFetch<OperatingSystem[]>('/operatingSystems');
  const [operatingSystemId, setOperatingSystemId] = useState<number | null>(null);

  const { data, loading } = useFetch<Frontend[]>('/frontends', {
    params: { operatingSystemId },
  });

  return (
    <Container style={{ paddingTop: 24 }}>
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
          {data?.map((frontend) => (
            <Col key={frontend.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <FrontendCard frontend={frontend} />
            </Col>
          ))}
        </Row>
      </Spin>
    </Container>
  );
}
