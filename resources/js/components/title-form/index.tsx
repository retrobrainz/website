import { App, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type Title from '../../types/Title';

import AskGoogle from '../ask-google';
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
        mobygames: title.mobygames,
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

  const name = Form.useWatch('name', form);

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Wikipedia"
        name="wikipedia"
        extra={<AskGoogle query={`wikipedia link of game "${name}"`} />}
      >
        <Input placeholder="https://en.wikipedia.org/wiki/..." />
      </Form.Item>

      <Form.Item
        label="MobyGames"
        name="mobygames"
        extra={<AskGoogle query={`mobygames link of game "${name}"`} />}
      >
        <Input placeholder="https://www.mobygames.com/game/..." />
      </Form.Item>

      <Form.Item
        label={t('franchises')}
        name="franchiseIds"
        extra={<AskGoogle query={`franchises of game "${name}"`} />}
      >
        <FranchiseSelect mode="multiple" />
      </Form.Item>

      <Form.Item
        label={t('genres')}
        name="genreIds"
        extra={<AskGoogle query={`genres of game "${name}"`} />}
      >
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
