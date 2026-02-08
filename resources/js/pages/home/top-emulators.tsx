import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import EmulatorCard from '../../components/emulator-card';
import type Emulator from '../../types/Emulator';

export default function TopEmulators() {
  const { t } = useTranslation();
  const { data } = useFetch<{ data: Emulator[] }>('/emulators', {
    params: { page: 1, pageSize: 6 },
  });

  return (
    <>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('emulators')}
        </Typography.Title>
        <Link href="/emulators">
          <Button type="text" icon={<ArrowRightOutlined />}>
            {t('more')}
          </Button>
        </Link>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {data?.data.map((emulator) => (
          <Col key={emulator.id} xs={24} md={12} xl={8} xxl={4}>
            <EmulatorCard emulator={emulator} />
          </Col>
        ))}
      </Row>
    </>
  );
}
