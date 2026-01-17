import { Breadcrumb, Flex, Table, Tag } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { Link, useParams } from 'wouter';
import GameImageView from './GameImageView.js';

export default function PlatformPage() {
  const { platformId } = useParams();

  const { data: platform } = useFetch<any>(`/platforms/${platformId}`);

  const [page, setPage] = useState(1);

  const { data, reload } = useFetch<{ data: any[]; meta: { total: number } }>(`/games`, {
    params: { page, platformId },
  });

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[{ title: <Link href="/">Home</Link> }, { title: platform?.name || '...' }]}
        style={{ marginBottom: 16 }}
      />

      <Table
        tableLayout="fixed"
        dataSource={data?.data}
        pagination={{
          current: page,
          onChange: setPage,
          total: data?.meta?.total,
          showTotal: (total) => `Total ${total} games`,
        }}
        columns={[
          {
            title: 'Boxart',
            width: 80,
            render: (_, game) => <GameImageView game={game} type="boxart" onUpload={reload} />,
          },
          {
            dataIndex: 'images',
            title: 'Title',
            width: 80,
            render: (_, game) => <GameImageView game={game} type="titlescreen" onUpload={reload} />,
          },
          {
            dataIndex: 'images',
            title: 'Snap',
            width: 80,
            render: (_, game) => <GameImageView game={game} type="screenshot" onUpload={reload} />,
          },
          {
            dataIndex: ['title', 'name'],
            title: 'Title',
          },
          {
            dataIndex: ['title', 'franchises'],
            title: 'Franchises',
            render: (regions?: any[]) => (
              <Flex gap={8}>
                {regions?.map((region) => (
                  <Tag key={region.id} color="blue">
                    {region.name}
                  </Tag>
                ))}
              </Flex>
            ),
          },
          {
            dataIndex: 'regions',
            title: 'Regions',
            width: 120,
            render: (regions: any[]) => (
              <Flex gap={8}>
                {regions.map((region) => (
                  <Tag key={region.id} color="blue">
                    {region.name}
                  </Tag>
                ))}
              </Flex>
            ),
          },
          {
            dataIndex: 'languages',
            title: 'Languages',
            width: 150,
          },
          {
            dataIndex: 'name',
            title: 'Name',
            render: (name: string, { id }: any) => (
              <a href={`/platforms/${platformId}/games/${id}`}>{name}</a>
            ),
          },
          {
            dataIndex: 'developers',
            title: 'Developers',
            render: (regions: any[]) => (
              <Flex gap={8}>
                {regions.map((region) => (
                  <Tag key={region.id} color="blue">
                    {region.name}
                  </Tag>
                ))}
              </Flex>
            ),
          },
          {
            dataIndex: 'publishers',
            title: 'Publishers',
            render: (regions: any[]) => (
              <Flex gap={8}>
                {regions.map((region) => (
                  <Tag key={region.id} color="blue">
                    {region.name}
                  </Tag>
                ))}
              </Flex>
            ),
          },
          {
            dataIndex: 'releaseDate',
            title: 'Release Date',
          },
        ]}
      />
    </Container>
  );
}
