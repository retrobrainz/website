import { App, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type Title from '../../types/Title';

import FranchiseSelect from '../franchise-select';
import GenreSelect from '../genre-select';

interface TitleFormProps {
  title?: Title;
  onSubmit: (values: any) => Promise<void>;
  submitText: string;
}

export default function TitleForm({ title, onSubmit, submitText }: TitleFormProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (title) {
      form.setFieldsValue({
        name: title.name,
        wikipedia: title.wikipedia,
        franchiseIds: title.franchises?.map((f) => f.id) || [],
        genreIds: title.genres?.map((g) => g.id) || [],
      });
    }
  }, [title, form]);

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

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Wikipedia" name="wikipedia">
        <Input placeholder="https://en.wikipedia.org/wiki/..." />
      </Form.Item>

      <Form.Item label={t('franchises')} name="franchiseIds">
        <FranchiseSelect mode="multiple" />
      </Form.Item>

      <Form.Item label={t('genres')} name="genreIds">
        <GenreSelect mode="multiple" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
