import { Flex, Image, Table, Tag, Tooltip } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { data } = useFetch<{ data: any[]; meta: { total: number } }>(`/api/games?page=${page}`, {
    params: { page },
  });

  return (
    <div>
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
              return image && <Image key={image.id} src={image.url} width={50} height={50} />;
            },
          },
          {
            dataIndex: 'images',
            title: 'Title',
            width: 80,
            render: (images: any[]) => {
              const image = images.find((img) => img.type === 'titlescreen');
              return image && <Image key={image.id} src={image.url} width={50} height={50} />;
            },
          },
          {
            dataIndex: 'images',
            title: 'Ingame',
            width: 80,
            render: (images: any[]) => {
              const image = images.find((img) => img.type === 'screenshot');
              return image && <Image key={image.id} src={image.url} width={50} height={50} />;
            },
          },
          {
            dataIndex: ['platform', 'name'],
            title: 'Platform',
            width: 180,
          },
          {
            dataIndex: ['title', 'name'],
            title: 'Title',
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
          },
          {
            dataIndex: 'releaseDate',
            title: 'Release Date',
          },
          {
            dataIndex: 'roms',
            title: 'ROMs',
            render: (roms: any[]) => (
              <Tooltip
                title={roms.map((rom) => (
                  <div key={rom.filename}>{rom.filename}</div>
                ))}
              >
                {roms.length}
              </Tooltip>
            ),
          },
        ]}
      />
    </div>
  );
}
