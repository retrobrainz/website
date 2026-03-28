import { DeleteOutlined, EditOutlined, PlusOutlined, TranslationOutlined } from '@ant-design/icons';
import { App, Breadcrumb, Button, Flex, Input, Popconfirm, Space, Table, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import xior from 'xior';
import type Language from '../../types/Language';

export default function AdminLanguagesPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const {
    data: languages,
    loading,
    reload,
  } = useFetch<Language[]>('/admin/languages', {
    params: { search: search || undefined },
  });

  const handleDelete = async (languageId: number) => {
    try {
      await xior.delete(`/admin/languages/${languageId}`);
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
          { title: t('languages') },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('languages')}
        </Typography.Title>

        <Link href="/admin/languages/new">
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
        dataSource={languages || []}
        pagination={false}
        columns={[
          {
            title: 'Code',
            dataIndex: 'code',
            width: 120,
          },
          {
            title: t('name'),
            dataIndex: 'name',
            render: (_: string, language: Language) => (
              <Link href={`/admin/languages/${language.id}/edit`}>{language.name}</Link>
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
            width: 320,
            render: (_: unknown, language: Language) => (
              <Space>
                <Link href={`/admin/languages/${language.id}/translate`}>
                  <Button icon={<TranslationOutlined />}>{t('translate')}</Button>
                </Link>
                <Link href={`/admin/languages/${language.id}/edit`}>
                  <Button icon={<EditOutlined />}>{t('edit')}</Button>
                </Link>
                <Popconfirm
                  title={`${t('delete')} ${language.name}?`}
                  onConfirm={() => handleDelete(language.id)}
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
