import { Flex, Table, Tag } from 'antd';
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
        dataSource={data?.data}
        pagination={{ current: page, onChange: setPage, total: data?.meta?.total }}
        columns={[
          {
            dataIndex: ['platform', 'name'],
            title: 'Platform',
          },
          {
            dataIndex: ['title', 'name'],
            title: 'Title',
          },
          {
            dataIndex: 'regions',
            title: 'Regions',
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
          },
          {
            dataIndex: 'id',
            title: 'ID',
          },
          {
            dataIndex: 'name',
            title: 'Name',
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
