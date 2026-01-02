import { Table } from 'antd';
import { useFetch } from 'react-fast-fetch';

export default function RegionsPage() {
  const { data } = useFetch<any[]>(`/api/regions`);
  return (
    <Table
      dataSource={data}
      columns={[
        {
          dataIndex: 'id',
          title: 'ID',
        },
        {
          dataIndex: 'name',
          title: 'Name',
        },
      ]}
    />
  );
}
