import { Col, Form, Input, Pagination, Row, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import Game from '../../types/Game.js';
import GameCard from '../game-card/index.js';

interface GameListFilters {
  favoriteUserId?: number | string;
  franchiseId?: number;
  genreId?: number;
  languageId?: number;
  platformId?: number;
  regionId?: number;
  search?: string;
}

interface GameListProps {
  initialFilters?: GameListFilters;
  showFilters?: Array<keyof GameListFilters>;
}

export default function GameList({ initialFilters = {}, showFilters = [] }: GameListProps) {
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

  const { data: regions } = useFetch<any[]>('/regions', {
    params: filters.platformId ? { platformId: filters.platformId } : undefined,
    disabled: !showFilters.includes('regionId'),
  });
  const { data: languages } = useFetch<any[]>('/languages', {
    params: filters.platformId ? { platformId: filters.platformId } : undefined,
    disabled: !showFilters.includes('languageId'),
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
      {showFilters && showFilters.length > 0 && (
        <Form
          form={form}
          initialValues={initialFilters}
          onValuesChange={(changedValues: any) => {
            setFilters((prev) => ({ ...prev, ...changedValues }));
          }}
        >
          {showFilters.includes('search') && (
            <Form.Item name="search">
              <Input.Search placeholder={t('search')} allowClear />
            </Form.Item>
          )}

          {showFilters.includes('platformId') && (
            <Form.Item label={t('platform')} name="platformId">
              <Tag.CheckableTagGroup
                options={platforms
                  ?.sort((a, b) => (b.gamesCount || 0) - (a.gamesCount || 0))
                  ?.map((platform) => ({ value: platform.id, label: platform.name }))}
              />
            </Form.Item>
          )}

          {showFilters.includes('regionId') && (
            <Form.Item label={t('region')} name="regionId">
              <Tag.CheckableTagGroup
                options={regions?.map((region) => ({ value: region.id, label: region.name }))}
              />
            </Form.Item>
          )}

          {showFilters.includes('languageId') && (
            <Form.Item label={t('language')} name="languageId">
              <Tag.CheckableTagGroup
                options={languages?.map((language) => ({
                  value: language.id,
                  label: language.name,
                }))}
              />
            </Form.Item>
          )}
        </Form>
      )}

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {data?.data?.map((game) => (
          <Col key={game.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>

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
        align="center"
        hideOnSinglePage
        style={{ marginTop: 24 }}
      />
    </div>
  );
}
