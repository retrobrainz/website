import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Button, DatePicker, Form, Input, Modal, Popconfirm, Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import type { CompanyName } from '../../types/Company';

export interface CompanyNamesManagerProps {
  companyId: number;
  canManage: boolean;
}

export default function CompanyNamesManager({ companyId, canManage }: CompanyNamesManagerProps) {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingName, setEditingName] = useState<CompanyName | null>(null);

  const { data: companyNames, reload } = useFetch<CompanyName[]>(`/companies/${companyId}/names`);

  const openCreateModal = () => {
    setEditingName(null);
    form.resetFields();
    setOpen(true);
  };

  const openEditModal = (companyName: CompanyName) => {
    setEditingName(companyName);
    form.setFieldsValue({
      name: companyName.name,
      abbr: companyName.abbr,
      startDate: companyName.startDate ? dayjs(companyName.startDate) : null,
      endDate: companyName.endDate ? dayjs(companyName.endDate) : null,
    });
    setOpen(true);
  };

  const handleSave = async (values: any) => {
    const payload = {
      ...values,
      startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
      endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null,
    };

    try {
      setSaving(true);
      if (editingName) {
        await xior.put(`/companies/${companyId}/names/${editingName.id}`, payload);
      } else {
        await xior.post(`/companies/${companyId}/names`, payload);
      }
      message.success(t('saved'));
      setOpen(false);
      setEditingName(null);
      form.resetFields();
      await reload();
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await xior.delete(`/companies/${companyId}/names/${id}`);
      message.success(t('delete-success'));
      await reload();
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message);
    }
  };

  const columns: any[] = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('abbr'),
      dataIndex: 'abbr',
      key: 'abbr',
      render: (value: string | null) => value || '-',
    },
    {
      title: t('start-date'),
      dataIndex: 'startDate',
      key: 'startDate',
      render: (value: string | null) => value || '-',
    },
    {
      title: t('end-date'),
      dataIndex: 'endDate',
      key: 'endDate',
      render: (value: string | null) => value || '-',
    },
  ];

  if (canManage) {
    columns.push({
      title: t('action'),
      key: 'action',
      width: 180,
      render: (_: unknown, record: CompanyName) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            {t('edit')}
          </Button>
          <Popconfirm
            title={t('delete')}
            description={record.name}
            okText={t('delete')}
            cancelText={t('cancel')}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} type="link">
              {t('delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    });
  }

  return (
    <div>
      {companyNames?.map((name) => (
        <div key={name.id}>
          <span>{name.name}</span>
          {name.abbr && ` (${name.abbr})`}, {name.startDate?.substring(0, 4) || '????'}
          &ndash;
          {name.endDate?.substring(0, 4) || '????'} &nbsp;
          {canManage && (
            <Space>
              <Button
                icon={<EditOutlined />}
                type="link"
                onClick={() => openEditModal(name)}
                style={{ padding: 0 }}
              >
                {t('edit')}
              </Button>
              <Popconfirm
                title={t('delete')}
                description={name.name}
                okText={t('delete')}
                cancelText={t('cancel')}
                onConfirm={() => handleDelete(name.id)}
              >
                <Button danger icon={<DeleteOutlined />} type="link" style={{ padding: 0 }}>
                  {t('delete')}
                </Button>
              </Popconfirm>
            </Space>
          )}
        </div>
      ))}

      {canManage && (
        <div style={{ marginBottom: 16 }}>
          <Button
            icon={<PlusOutlined />}
            type="link"
            onClick={openCreateModal}
            style={{ padding: 0 }}
          >
            {t('new')}
          </Button>
        </div>
      )}

      <Modal
        title={editingName ? t('edit') : t('new')}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
            <Input maxLength={256} />
          </Form.Item>

          <Form.Item label={t('abbr')} name="abbr">
            <Input maxLength={64} />
          </Form.Item>

          <Form.Item label={t('start-date')} name="startDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label={t('end-date')} name="endDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Space>
            <Button onClick={() => setOpen(false)}>{t('cancel')}</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              {t('save')}
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}
