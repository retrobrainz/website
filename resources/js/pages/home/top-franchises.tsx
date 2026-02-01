import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import FranchiseCard from '../../components/franchise-card/index.js';
import type Franchise from '../../types/Franchise.js';

export default function TopFranchises() {
  const { t } = useTranslation();
  const { data: franchises } = useFetch<{ data: Franchise[] }>('/franchises', {
    params: { page: 1, pageSize: 12 },
  });

  return (
    <>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('franchises')}
        </Typography.Title>
        <Link href="/franchises">
          <Button type="text" icon={<ArrowRightOutlined />}>
            {t('more')}
          </Button>
        </Link>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {franchises?.data.map((franchise) => (
          <Col key={franchise.id} xs={24} md={12} xl={8} xxl={4}>
            <FranchiseCard franchise={franchise} />
          </Col>
        ))}
      </Row>
    </>
  );
}
