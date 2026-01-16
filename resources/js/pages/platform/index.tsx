import { Breadcrumb, Flex, Image, Table, Tag } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { Link, useParams } from 'wouter';

export default function PlatformPage() {
  const { platformId } = useParams();

  const { data: platform } = useFetch<any>(`/platforms/${platformId}`);

  const [page, setPage] = useState(1);

  const { data } = useFetch<{ data: any[]; meta: { total: number } }>(`/games`, {
    params: { page, platformId },
  });

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/">Home</Link> },
          { title: `${platform?.company?.name} - ${platform?.name}` },
        ]}
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
            dataIndex: 'images',
            title: 'Boxart',
            width: 80,
            render: (images: any[]) => {
              const image = images.find((img) => img.type === 'boxart');
              return <Image src={image?.image?.url} width={50} height={50} />;
            },
          },
          {
            dataIndex: 'images',
            title: 'Title',
            width: 80,
            render: (images: any[]) => {
              const image = images.find((img) => img.type === 'titlescreen');
              return <Image src={image?.image?.url} width={50} height={50} />;
            },
          },
          {
            dataIndex: 'images',
            title: 'Ingame',
            width: 80,
            render: (images: any[]) => {
              const image = images.find((img) => img.type === 'screenshot');
              return <Image src={image?.image?.url} width={50} height={50} />;
            },
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
    </div>
  );
}
