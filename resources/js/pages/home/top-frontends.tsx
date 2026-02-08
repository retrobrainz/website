import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import FrontendCard from '../../components/frontend-card';
import type Frontend from '../../types/Frontend';

export default function TopFrontends() {
  const { t } = useTranslation();
  const { data } = useFetch<{ data: Frontend[] }>('/frontends', {
    params: { page: 1, pageSize: 6 },
  });

  return (
    <>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('frontends')}
        </Typography.Title>
        <Link href="/frontends">
          <Button type="text" icon={<ArrowRightOutlined />}>
            {t('more')}
          </Button>
        </Link>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {data?.data.map((frontend) => (
          <Col key={frontend.id} xs={24} md={12} xl={8} xxl={4}>
            <FrontendCard frontend={frontend} />
          </Col>
        ))}
      </Row>
    </>
  );
}
