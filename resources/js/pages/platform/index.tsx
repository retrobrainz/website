import { Breadcrumb, Flex, Image, Table, Tag } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { Link, useParams } from 'wouter';
import Game from '../../types/Game.js';
import Platform from '../../types/Platform.js';
import ImageUpload from './ImageUpload.js';

export default function PlatformPage() {
  const { platformId } = useParams();

  const { data: platform } = useFetch<Platform>(`/platforms/${platformId}`);

  const [page, setPage] = useState(1);

  const { data, reload } = useFetch<{ data: Game[]; meta: { total: number } }>(`/games`, {
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
            dataIndex: 'boxart',
            title: 'Boxart',
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
            title: 'Title',
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
            title: 'Snap',
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
            title: 'Name',
            width: 500,
            render: (name: string, { id }: any) => (
              <Link href={`/platforms/${platformId}/games/${id}`}>{name}</Link>
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
            dataIndex: 'developers',
            title: 'Developers',
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
            title: 'Publishers',
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
            title: 'Release Date',
          },
          {
            dataIndex: 'franchises',
            title: 'Franchises',
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
            title: 'Genres',
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
    </Container>
  );
}
