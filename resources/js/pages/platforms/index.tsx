import { Table } from 'antd';
import { useFetch } from 'react-fast-fetch';

export default function PlatformsPage() {
  const { data } = useFetch<any[]>(`/platforms`);
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
        {
          dataIndex: 'company',
          title: 'Company',
        },
        {
          dataIndex: 'code',
          title: 'Code',
        },
      ]}
    />
  );
}
