import { PlusOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Pagination,
  Row,
  Spin,
  Tag,
  Typography,
} from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import TitleCard from '../../components/title-card';
import { useAuth } from '../../contexts/auth';
import Title from '../../types/Title';

interface TitleFilters {
  search?: string;
  platformId?: number | string;
  franchiseId?: number | string;
  genreId?: number | string;
}

export default function TitlesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [filters, setFilters] = useState<TitleFilters>({});
  const [form] = Form.useForm();

  const { data: titles, loading } = useFetch<{ data: Title[]; meta: { total: number } }>(
    '/titles',
    {
      params: { page, pageSize, ...filters },
    },
  );

  const { data: platforms } = useFetch<any[]>('/platforms', {
    disabled: !form.isFieldTouched('platformId'),
  });

  const { data: franchises } = useFetch<any[]>('/franchises', {
    disabled: !form.isFieldTouched('franchiseId'),
  });

  const { data: genres } = useFetch<any[]>('/genres', {
    disabled: !form.isFieldTouched('genreId'),
  });

  const canCreateTitle = user?.role === 'admin' || user?.role === 'editor';

  const handleFilterChange = () => {
    setPage(1);
    setFilters(form.getFieldsValue());
  };

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('titles') }]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('titles')}
        </Typography.Title>
        {canCreateTitle && (
          <Link href="/titles/new">
            <Button icon={<PlusOutlined />}>{t('new')}</Button>
          </Link>
        )}
      </Flex>

      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFilterChange}
        style={{ marginBottom: 24 }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="search" noStyle>
              <Input.Search placeholder={t('search')} allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="platformId" noStyle>
              <Tag.CheckableTagGroup
                options={
                  platforms?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) ?? []
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="franchiseId" noStyle>
              <Tag.CheckableTagGroup
                options={
                  franchises?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) ?? []
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="genreId" noStyle>
              <Tag.CheckableTagGroup
                options={
                  genres?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) ?? []
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {titles?.data?.map((title) => (
            <Col key={title.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <TitleCard title={title} />
            </Col>
          ))}
        </Row>
        {!loading && titles?.data?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
            {t('not-found')}
          </div>
        )}

        <Flex justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={titles?.meta?.total || 0}
            onChange={(p, ps) => {
              setPage(p);
              setPageSize(ps);
            }}
            showSizeChanger
          />
        </Flex>
      </Spin>
    </Container>
  );
}
