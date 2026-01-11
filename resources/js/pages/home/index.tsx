import { Flex, Image, Radio, Table, Tag, Tooltip } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [platformId, setPlatformId] = useState(1);

  const { data } = useFetch<{ data: any[]; meta: { total: number } }>(`/api/games`, {
    params: { page, platformId },
  });

  const { data: platforms } = useFetch<any[]>(`/api/platforms`);

  return (
    <div>
      <Radio.Group
        value={platformId}
        onChange={(e) => {
          setPlatformId(e.target.value);
        }}
        options={platforms?.map((platform) => ({ label: platform.name, value: platform.id }))}
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
              return <Image src={image?.url} width={50} height={50} />;
            },
          },
          {
            dataIndex: 'images',
            title: 'Title',
            width: 80,
            render: (images: any[]) => {
              const image = images.find((img) => img.type === 'titlescreen');
              return <Image src={image?.url} width={50} height={50} />;
            },
          },
          {
            dataIndex: 'images',
            title: 'Ingame',
            width: 80,
            render: (images: any[]) => {
              const image = images.find((img) => img.type === 'screenshot');
              return <Image src={image?.url} width={50} height={50} />;
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
