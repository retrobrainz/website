import { Flex, Form, Image, Table, Tag } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import Game from '../../types/Game.js';
import ImageUpload from './ImageUpload.js';

export default function GameList() {
  const { platformId } = useParams();
  const { t } = useTranslation();

  const { data: regions } = useFetch<any[]>(`/regions`, { params: { platformId } });
  const { data: languages } = useFetch<any[]>(`/languages`, { params: { platformId } });

  const [page, setPage] = useState(1);

  const [form] = Form.useForm();
  const regionId = Form.useWatch('regionId', form);
  const languageId = Form.useWatch('languageId', form);

  const { data, reload } = useFetch<{ data: Game[]; meta: { total: number } }>(`/games`, {
    params: { page, platformId, regionId, languageId },
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

      <Table
        tableLayout="fixed"
        dataSource={data?.data}
        pagination={{
          current: page,
          onChange: setPage,
          total: data?.meta?.total,
          showTotal: (total) => t('total-games', { total }),
        }}
        columns={[
          {
            dataIndex: 'boxart',
            title: t('boxart'),
            width: 80,
            render: (boxart, game) =>
              boxart ? (
                <Image src={boxart.url} width="auto" height={48} />
              ) : (
                <ImageUpload game={game} type="boxart" onFinish={reload} />
              ),
          },
          {
            dataIndex: 'title',
            title: t('title'),
            width: 80,
            render: (title, game) =>
              title ? (
                <Image src={title.url} width="auto" height={48} />
              ) : (
                <ImageUpload game={game} type="title" onFinish={reload} />
              ),
          },
          {
            dataIndex: 'snap',
            title: t('snap'),
            width: 80,
            render: (snap, game) =>
              snap ? (
                <Image src={snap.url} width="auto" height={48} />
              ) : (
                <ImageUpload game={game} type="snap" onFinish={reload} />
              ),
          },
          {
            dataIndex: 'name',
            title: t('name'),
            width: 500,
            render: (name: string, { id }: any) => (
              <Link href={`/platforms/${platformId}/games/${id}`}>{name}</Link>
            ),
          },
          {
            dataIndex: 'regions',
            title: t('regions'),
            width: 120,
            render: (regions_: any[]) => (
              <Flex gap={8}>
                {regions_.map((region) => (
                  <Tag key={region.id} color="blue">
                    {region.name}
                  </Tag>
                ))}
              </Flex>
            ),
          },
          {
            dataIndex: 'developers',
            title: t('developers'),
            render: (developers: any[]) => (
              <Flex gap={8}>
                {developers.map((developer) => (
                  <Tag key={developer.id} color="blue">
                    {developer.name}
                  </Tag>
                ))}
              </Flex>
            ),
          },
          {
            dataIndex: 'publishers',
            title: t('publishers'),
            render: (publishers: any[]) => (
              <Flex gap={8}>
                {publishers.map((publisher) => (
                  <Tag key={publisher.id} color="blue">
                    {publisher.name}
                  </Tag>
                ))}
              </Flex>
            ),
          },
          {
            dataIndex: 'releaseDate',
            title: t('release-date'),
          },
          {
            dataIndex: 'franchises',
            title: t('franchises'),
            render: (franchises?: any[]) => (
              <Flex gap={8}>
                {franchises?.map((franchise) => (
                  <Tag key={franchise.id} color="blue">
                    {franchise.name}
                  </Tag>
                ))}
              </Flex>
            ),
          },
          {
            dataIndex: 'genres',
            title: t('genres'),
            render: (genres?: any[]) => (
              <Flex gap={8}>
                {genres?.map((genre) => (
                  <Tag key={genre.id} color="blue">
                    {genre.name}
                  </Tag>
                ))}
              </Flex>
            ),
          },
        ]}
      />
    </div>
  );
}
