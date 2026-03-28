import { DeleteOutlined, EditOutlined, PlusOutlined, TranslationOutlined } from '@ant-design/icons';
import { App, Breadcrumb, Button, Flex, Input, Popconfirm, Space, Table, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import xior from 'xior';
import type Region from '../../types/Region';

export default function AdminRegionsPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const {
    data: regions,
    loading,
    reload,
  } = useFetch<Region[]>('/admin/regions', {
    params: { search: search || undefined },
  });

  const handleDelete = async (regionId: number) => {
    try {
      await xior.delete(`/admin/regions/${regionId}`);
      message.success(t('delete-success'));
      reload();
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/settings">{t('settings')}</Link> },
          { title: t('regions') },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('regions')}
        </Typography.Title>

        <Link href="/admin/regions/new">
          <Button icon={<PlusOutlined />}>{t('new')}</Button>
        </Link>
      </Flex>

      <Input.Search
        allowClear
        placeholder={t('search')}
        onSearch={setSearch}
        style={{ marginBottom: 16, maxWidth: 360 }}
      />

      <Table
        rowKey="id"
        loading={loading}
        dataSource={regions || []}
        pagination={false}
        columns={[
          {
            title: t('name'),
            dataIndex: 'name',
            render: (_: string, region: Region) => (
              <Link href={`/admin/regions/${region.id}/edit`}>{region.name}</Link>
            ),
          },
          {
            title: t('games'),
            dataIndex: 'gamesCount',
            width: 120,
          },
          {
            title: t('action'),
            key: 'action',
            width: 280,
            render: (_: unknown, region: Region) => (
              <Space>
                <Link href={`/admin/regions/${region.id}/translate`}>
                  <Button icon={<TranslationOutlined />}>{t('translate')}</Button>
                </Link>
                <Link href={`/admin/regions/${region.id}/edit`}>
                  <Button icon={<EditOutlined />}>{t('edit')}</Button>
                </Link>
                <Popconfirm
                  title={`${t('delete')} ${region.name}?`}
                  onConfirm={() => handleDelete(region.id)}
                  okText={t('delete')}
                  cancelText={t('cancel')}
                >
                  <Button danger icon={<DeleteOutlined />}>
                    {t('delete')}
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />
    </Container>
  );
}
