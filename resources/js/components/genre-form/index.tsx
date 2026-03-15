import { App, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type Genre from '../../types/Genre';
import AskGoogle from '../ask-google';

interface GenreFormProps {
  genre?: Genre;
  onSubmit: (values: any) => Promise<void>;
  submitText: string;
}

export default function GenreForm({ genre, onSubmit, submitText }: GenreFormProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (genre) {
      form.setFieldsValue(genre);
    }
  }, [genre, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await onSubmit(values);
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

  const name = Form.useWatch('name', form);

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label={t('wikipedia')}
        name="wikipedia"
        rules={[{ type: 'url' }]}
        extra={<AskGoogle query={`wikipedia link of genre "${name}"`} />}
      >
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
