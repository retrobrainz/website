import { Table } from 'antd';
import { useFetch } from 'react-fast-fetch';

export default function HomePage() {
  const { data } = useFetch<any[]>('/platforms');

  return (
    <div>
      <Table
        tableLayout="fixed"
        dataSource={data}
        pagination={false}
        columns={[
          {
            dataIndex: ['company', 'name'],
            title: 'Company',
            sorter: (a: any, b: any) => a.company.name.localeCompare(b.company.name),
          },
          {
            dataIndex: 'name',
            title: 'Name',
            render: (name: string, { id }: any) => <a href={`/platforms/${id}`}>{name}</a>,
            sorter: (a: any, b: any) => a.company.name.localeCompare(b.company.name),
          },
          {
            dataIndex: 'releaseDate',
            title: 'Release Date',
            render: (date: string) => new Date(date).toLocaleDateString(),
            sorter: (a: any, b: any) =>
              new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
          },
          {
            dataIndex: 'gamesCount',
            title: 'Games Count',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.gamesCount - b.gamesCount,
          },
        ]}
      />
    </div>
  );
}
