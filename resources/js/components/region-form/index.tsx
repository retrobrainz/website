import { App, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type Region from '../../types/Region';

interface RegionFormProps {
  region?: Region;
  onSubmit: (values: { name: string }) => Promise<void>;
  submitText: string;
}

export default function RegionForm({ region, onSubmit, submitText }: RegionFormProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (region) {
      form.setFieldsValue({
        name: region.name,
      });
    }
  }, [form, region]);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);

    try {
      await onSubmit({
        name: values.name.trim(),
      });
    } catch (error: any) {
      const errors = error.response?.data?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((item: { message: string }) => {
          message.error(item.message);
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
        <Input maxLength={32} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
