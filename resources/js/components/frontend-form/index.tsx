import { App, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImageUpload from '../image-upload/index.js';
import OperatingSystemSelect from '../operating-system-select/index.js';
import EmulatorSelect from '../emulator-select/index.js';
import type Frontend from '../../types/Frontend.js';

interface FrontendFormProps {
  frontend?: Frontend;
  onSubmit: (values: any) => Promise<void>;
  submitText: string;
}

export default function FrontendForm({ frontend, onSubmit, submitText }: FrontendFormProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (frontend) {
      form.setFieldsValue({
        name: frontend.name,
        website: frontend.website,
        sourceCode: frontend.sourceCode,
        emulatorIds: frontend.emulators?.map((e) => e.id) || [],
        operatingSystemIds: frontend.operatingSystems?.map((os) => os.id) || [],
        icon: frontend.icon || null,
        screenshot: frontend.screenshot || null,
      });
    }
  }, [frontend, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        iconId: values.icon?.id || null,
        screenshotId: values.screenshot?.id || null,
      };
      // Remove icon and screenshot from payload as we only need the IDs
      delete payload.icon;
      delete payload.screenshot;
      await onSubmit(payload);
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

      <Form.Item label={t('website')} name="website">
        <Input type="url" />
      </Form.Item>

      <Form.Item label={t('source-code')} name="sourceCode">
        <Input type="url" />
      </Form.Item>

      <Form.Item label={t('emulators')} name="emulatorIds">
        <EmulatorSelect mode="multiple" />
      </Form.Item>

      <Form.Item label={t('operating-systems')} name="operatingSystemIds">
        <OperatingSystemSelect mode="multiple" />
      </Form.Item>

      <Form.Item label={t('icon')} name="icon">
        <ImageUpload width="256" height="256" />
      </Form.Item>

      <Form.Item label={t('screenshot')} name="screenshot">
        <ImageUpload width="1280" height="720" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
