import { App, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type Franchise from '../../types/Franchise';
import ImageUpload from '../image-upload';

interface FranchiseFormProps {
  franchise?: Franchise;
  onSubmit: (values: any) => Promise<void>;
  submitText: string;
}

export default function FranchiseForm({ franchise, onSubmit, submitText }: FranchiseFormProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (franchise) {
      form.setFieldsValue(franchise);
    }
  }, [franchise, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await onSubmit({ ...values, iconId: values.icon?.id });
    } catch (error: any) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          message.error(err.message);
        });
      } else {
        message.error(error.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label={t('icon')} name="icon">
        <ImageUpload width={256} height={256} format="avif" fit="cover" />
      </Form.Item>

      <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label={t('wikipedia')} name="wikipedia" rules={[{ type: 'url' }]}>
        <Input type="url" placeholder="https://en.wikipedia.org/wiki/..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
