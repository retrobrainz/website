import { Col, Form, Input, Pagination, Row, Spin, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import Platform from '../../types/Platform';
import Title from '../../types/Title';
import TitleCard from '../title-card';

interface TitleListFilters {
  search?: string;
  platformId?: number | string;
  franchiseId?: number | string;
  genreId?: number | string;
}

interface TitleListProps {
  initialFilters?: TitleListFilters;
  showFilters?: Array<keyof TitleListFilters>;
  pageSize?: number;
  hidePagination?: boolean;
}

export default function TitleList({
  initialFilters = {},
  showFilters = [],
  pageSize: initialPageSize = 24,
  hidePagination = false,
}: TitleListProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { data: platforms } = useFetch<Platform[]>('/platforms', {
    disabled: !showFilters.includes('platformId'),
  });

  const { data, loading } = useFetch<{ data: Title[]; meta: { total: number } }>('/titles', {
    params: {
      page,
      pageSize,
      ...initialFilters,
      ...filters,
    },
  });

  return (
    <div>
      {showFilters && showFilters.length > 0 && (
        <Form
          initialValues={initialFilters}
          onValuesChange={(changedValues: any) => {
            setFilters((prev) => ({ ...prev, ...changedValues }));
          }}
          style={{ marginBottom: 24 }}
        >
          {showFilters.includes('search') && (
            <Form.Item>
              <Input.Search
                placeholder={t('search')}
                allowClear
                onSearch={(value) => setFilters((prev) => ({ ...prev, search: value }))}
              />
            </Form.Item>
          )}

          {showFilters.includes('platformId') && (
            <Form.Item label={t('platform')} name="platformId">
              <Tag.CheckableTagGroup
                options={
                  platforms?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) ?? []
                }
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, platformId: value ?? undefined }))
                }
              />
            </Form.Item>
          )}
        </Form>
      )}

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {data?.data?.map((title) => (
            <Col key={title.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <TitleCard title={title} />
            </Col>
          ))}
        </Row>
        {!loading && data?.data?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
            {t('not-found')}
          </div>
        )}

        {!hidePagination && (
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 24, marginBottom: 24 }}
          >
            <Pagination
              current={page}
              pageSize={pageSize}
              total={data?.meta?.total || 0}
              onChange={(p, ps) => {
                setPage(p);
                setPageSize(ps);
              }}
              showSizeChanger
            />
          </div>
        )}
      </Spin>
    </div>
  );
}
