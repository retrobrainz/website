import { Col, Form, Input, Pagination, Row, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import Game from '../../types/Game.js';
import GameCard from '../game-card/index.js';

interface GameListProps {
  initialFilters?: {
    platformId?: number;
    genreId?: number;
    franchiseId?: number;
    search?: string;
    regionId?: number;
    languageId?: number;
  };
  hideFilters?: Array<'platform' | 'region' | 'language' | 'search'>;
}

export default function GameList({ initialFilters = {}, hideFilters = [] }: GameListProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [filters, setFilters] = useState(initialFilters);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { data: platforms } = useFetch<any[]>('/platforms', {
    disabled: hideFilters.includes('platform'),
  });

  const { data: regions } = useFetch<any[]>('/regions', {
    params: filters.platformId ? { platformId: filters.platformId } : undefined,
    disabled: hideFilters.includes('region'),
  });
  const { data: languages } = useFetch<any[]>('/languages', {
    params: filters.platformId ? { platformId: filters.platformId } : undefined,
    disabled: hideFilters.includes('language'),
  });

  const { data } = useFetch<{ data: Game[]; meta: { total: number } }>('/games', {
    params: {
      page,
      pageSize,
      ...initialFilters,
      ...filters,
    },
  });

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialFilters}
        onValuesChange={(changedValues: any) => {
          setFilters((prev) => ({ ...prev, ...changedValues }));
        }}
      >
        {!hideFilters.includes('search') && (
          <Form.Item label={t('search')} name="search">
            <Input.Search allowClear />
          </Form.Item>
        )}

        {!hideFilters.includes('platform') && (
          <Form.Item label={t('platform')} name="platformId">
            <Tag.CheckableTagGroup
              options={platforms
                ?.sort((a, b) => (b.gamesCount || 0) - (a.gamesCount || 0))
                ?.map((platform) => ({ value: platform.id, label: platform.name }))}
            />
          </Form.Item>
        )}

        {!hideFilters.includes('region') && (
          <Form.Item label={t('region')} name="regionId">
            <Tag.CheckableTagGroup
              options={regions?.map((region) => ({ value: region.id, label: region.name }))}
            />
          </Form.Item>
        )}

        {!hideFilters.includes('language') && (
          <Form.Item label={t('language')} name="languageId">
            <Tag.CheckableTagGroup
              options={languages?.map((language) => ({ value: language.id, label: language.name }))}
            />
          </Form.Item>
        )}
      </Form>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {data?.data?.map((game) => (
          <Col key={game.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>

      {data?.meta?.total ? (
        <Pagination
          current={page}
          pageSize={pageSize}
          onChange={(p, pSize) => {
            setPage(p);
            setPageSize(pSize);
          }}
          total={data?.meta?.total}
          showTotal={(total) => t('total-games', { total })}
          showSizeChanger
          pageSizeOptions={['12', '24', '48', '96']}
          style={{ marginTop: 24, textAlign: 'center' }}
        />
      ) : null}
    </div>
  );
}
