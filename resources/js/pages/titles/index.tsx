import { Table } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';

export default function TitlesPage() {
  const [page, setPage] = useState(1);
  const { data } = useFetch<{ data: any[]; meta: { total: number } }>(`/api/titles?page=${page}`, {
    params: { page },
  });

  return (
    <div>
      <Table
        dataSource={data?.data}
        pagination={{
          current: page,
          onChange: setPage,
          total: data?.meta?.total,
          showTotal: (total) => `Total ${total} titles`,
        }}
        columns={[
          {
            dataIndex: 'id',
            title: 'ID',
          },
          {
            dataIndex: 'name',
            title: 'Name',
          },
          {
            dataIndex: 'games',
            title: 'Games',
            render: (games: any[]) => games.length,
          },
        ]}
      />
    </div>
  );
}
