import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Flex, Input, Pagination, Row, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import CompanyCard from '../../components/company-card';
import { useAuth } from '../../contexts/auth';
import Company from '../../types/Company';

export default function CompaniesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [search, setSearch] = useState('');

  const { data: companies, loading } = useFetch<{ data: Company[]; meta: { total: number } }>(
    '/companies',
    {
      params: { page, pageSize, search },
    },
  );

  const canCreateCompany = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('companies') }]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('companies')}
        </Typography.Title>
        {canCreateCompany && (
          <Link href="/companies/new">
            <Button icon={<PlusOutlined />}>{t('new')}</Button>
          </Link>
        )}
      </Flex>

      <Input.Search
        placeholder={t('search')}
        onSearch={setSearch}
        style={{ marginBottom: 24 }}
        allowClear
      />

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {companies?.data?.map((company) => (
            <Col key={company.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <CompanyCard company={company} />
            </Col>
          ))}
        </Row>
        {!loading && companies?.data?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
            {t('not-found')}
          </div>
        )}

        <Flex justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={companies?.meta?.total || 0}
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
