import { App, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type Language from '../../types/Language';

interface LanguageFormProps {
  language?: Language;
  onSubmit: (values: { code: string; name: string }) => Promise<void>;
  submitText: string;
}

export default function LanguageForm({ language, onSubmit, submitText }: LanguageFormProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (language) {
      form.setFieldsValue({
        code: language.code,
        name: language.name,
      });
    }
  }, [form, language]);

  const handleSubmit = async (values: { code: string; name: string }) => {
    setLoading(true);

    try {
      await onSubmit({
        code: values.code.trim().toLowerCase(),
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
      <Form.Item label="Code" name="code" rules={[{ required: true }]}>
        <Input maxLength={2} />
      </Form.Item>

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
