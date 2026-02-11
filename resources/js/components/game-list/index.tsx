import { Col, Form, Input, Pagination, Row, Spin, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import Game from '../../types/Game';
import Language from '../../types/Language';
import Platform from '../../types/Platform';
import Region from '../../types/Region';
import GameCard from '../game-card';

interface GameListFilters {
  favoriteUserId?: number | string;
  franchiseId?: number;
  genreId?: number;
  languageId?: number;
  platformId?: number;
  regionId?: number;
  developerId?: number;
  publisherId?: number;
  titleId?: number;
  search?: string;
  orderBy?: string;
}

interface GameListProps {
  initialFilters?: GameListFilters;
  showFilters?: Array<keyof GameListFilters>;
  pageSize?: number;
  hidePagination?: boolean;
}

export default function GameList({
  initialFilters = {},
  showFilters = [],
  pageSize: initialPageSize = 24,
  hidePagination = false,
}: GameListProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { data: platforms } = useFetch<Platform[]>('/platforms', {
    params: {
      titleId: filters.titleId,
      franchiseId: filters.franchiseId,
      publisherId: filters.publisherId,
      developerId: filters.developerId,
    },
    disabled: !showFilters.includes('platformId'),
  });

  const { data: regions } = useFetch<Region[]>('/regions', {
    params: {
      platformId: filters.platformId,
      titleId: filters.titleId,
      franchiseId: filters.franchiseId,
      publisherId: filters.publisherId,
      developerId: filters.developerId,
    },
    disabled: !showFilters.includes('regionId'),
  });

  const { data: languages } = useFetch<Language[]>('/languages', {
    params: {
      platformId: filters.platformId,
      titleId: filters.titleId,
      franchiseId: filters.franchiseId,
    },
    disabled: !showFilters.includes('languageId'),
  });

  const { data, loading } = useFetch<{ data: Game[]; meta: { total: number } }>('/games', {
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

      <Spin spinning={loading}>
        <Row justify="center" gutter={[24, 24]} style={{ marginTop: 24 }}>
          {data?.data?.map((game) => (
            <Col key={game.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
              <GameCard game={game} />
            </Col>
          ))}
        </Row>
      </Spin>

      {!hidePagination && (
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
      )}
    </div>
  );
}
