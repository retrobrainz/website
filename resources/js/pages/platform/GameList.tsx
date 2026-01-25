import { Col, Form, Pagination, Row, Tag } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { useParams } from 'wouter';
import GameCard from '../../components/game-card/index.js';
import Game from '../../types/Game.js';

export default function GameList() {
  const { platformId } = useParams();
  const { t } = useTranslation();

  const { data: regions } = useFetch<any[]>(`/regions`, { params: { platformId } });
  const { data: languages } = useFetch<any[]>(`/languages`, { params: { platformId } });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const [form] = Form.useForm();
  const regionId = Form.useWatch('regionId', form);
  const languageId = Form.useWatch('languageId', form);

  const { data } = useFetch<{ data: Game[]; meta: { total: number } }>(`/games`, {
    params: { page, pageSize, platformId, regionId, languageId },
  });

  return (
    <div>
      <Form form={form}>
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

      <Row gutter={[24, 24]}>
        {data?.data?.map((game) => (
          <Col key={game.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>

      <Pagination
        current={page}
        onChange={(p, pSize) => {
          setPage(p);
          setPageSize(pSize);
        }}
        total={data?.meta?.total}
        showTotal={(total) => t('total-games', { total })}
      />
    </div>
  );
}
