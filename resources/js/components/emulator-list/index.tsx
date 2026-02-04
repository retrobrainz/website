import { Col, Form, Pagination, Row, Spin, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import Emulator from '../../types/Emulator.js';
import EmulatorCard from '../emulator-card/index.js';
import OperatingSystemIcon from '../operating-system-icon/index.js';

interface EmulatorListFilters {
  platformId?: number | string;
  operatingSystemId?: number | string;
  favoriteUserId?: number | string;
}

interface EmulatorListProps {
  initialFilters?: EmulatorListFilters;
  showFilters?: Array<keyof EmulatorListFilters>;
}

export default function EmulatorList({ initialFilters = {}, showFilters = [] }: EmulatorListProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { data: platforms } = useFetch<any[]>('/platforms', {
    disabled: !showFilters.includes('platformId'),
  });

  const { data: operatingSystems } = useFetch<any[]>('/operatingSystems', {
    disabled: !showFilters.includes('operatingSystemId'),
  });

  const { data, loading } = useFetch<{ data: Emulator[]; meta: { total: number } }>('/emulators', {
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
          form={form}
          initialValues={initialFilters}
          onValuesChange={(changedValues: any) => {
            setFilters((prev) => ({ ...prev, ...changedValues }));
          }}
        >
          {showFilters.includes('platformId') && (
            <Form.Item label={t('platform')} name="platformId">
              <Tag.CheckableTagGroup
                options={
                  platforms?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) ?? []
                }
              />
            </Form.Item>
          )}

          {showFilters.includes('operatingSystemId') && (
            <Form.Item label={t('operating-system')} name="operatingSystemId">
              <Tag.CheckableTagGroup
                options={
                  operatingSystems?.map((item) => ({
                    value: item.id,
                    label: (
                      <span>
                        <OperatingSystemIcon name={item.name} /> {item.name} ({item.arch})
                      </span>
                    ),
                  })) ?? []
                }
              />
            </Form.Item>
          )}
        </Form>
      )}

      <Spin spinning={loading}>
        <Row justify="center" gutter={[24, 24]} style={{ marginTop: 24 }}>
          {data?.data?.map((emulator) => (
            <Col key={emulator.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <EmulatorCard emulator={emulator} />
            </Col>
          ))}
        </Row>
      </Spin>

      {!data?.data?.length && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
          {t('no-emulators-found')}
        </div>
      )}

      <Pagination
        current={page}
        pageSize={pageSize}
        onChange={(p, pSize) => {
          setPage(p);
          setPageSize(pSize);
        }}
        total={data?.meta?.total}
        showTotal={(total) => t('total-emulators', { total })}
        showSizeChanger
        pageSizeOptions={['12', '24', '48', '96']}
        align="center"
        hideOnSinglePage
        style={{ marginTop: 24 }}
      />
    </div>
  );
}
