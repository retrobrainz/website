import { Col, Form, Pagination, Row, Tag } from 'antd';
import { Container } from 'antd-moe';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'wouter';
import GameCard from '../../components/game-card/index.js';
import Game from '../../types/Game.js';

export default function SearchPage() {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const search = searchParams.get('q') || '';

  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const platformId = Form.useWatch('platformId', form);
  const regionId = Form.useWatch('regionId', form);
  const languageId = Form.useWatch('languageId', form);

  // Fetch filter options
  const { data: platforms } = useFetch<any[]>('/platforms');
  const { data: regions } = useFetch<any[]>('/regions');
  const { data: languages } = useFetch<any[]>('/languages');

  // Fetch games based on search and filters
  const { data } = useFetch<{ data: Game[]; meta: { total: number } }>('/games', {
    params: { page, pageSize, search, platformId, regionId, languageId },
  });

  // Set initial search value when component mounts
  useEffect(() => {
    if (search) {
      form.setFieldValue('search', search);
    }
  }, [search, form]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, platformId, regionId, languageId]);

  return (
    <Container style={{ paddingTop: 24 }}>
      <Form form={form}>
        <Form.Item label={t('platform')} name="platformId">
          <Tag.CheckableTagGroup
            options={platforms
              ?.sort((a, b) => (b.gamesCount || 0) - (a.gamesCount || 0))
              ?.map((platform) => ({ value: platform.id, label: platform.name }))}
          />
        </Form.Item>

        <Form.Item label={t('region')} name="regionId">
          <Tag.CheckableTagGroup
            options={regions?.map((region) => ({ value: region.id, label: region.name }))}
          />
        </Form.Item>

        <Form.Item label={t('language')} name="languageId">
          <Tag.CheckableTagGroup
            options={languages?.map((language) => ({ value: language.id, label: language.name }))}
          />
        </Form.Item>
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
          style={{ marginTop: 24, textAlign: 'center' }}
        />
      ) : null}
    </Container>
  );
}
