import { App, Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImageUpload from '../image-upload/index.js';
import OperatingSystemSelect from '../operating-system-select/index.js';
import PlatformSelect from '../platform-select/index.js';
import type Emulator from '../../types/Emulator.js';

interface EmulatorFormProps {
  emulator?: Emulator;
  onSubmit: (values: any) => Promise<void>;
  submitText: string;
}

export default function EmulatorForm({ emulator, onSubmit, submitText }: EmulatorFormProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emulator) {
      form.setFieldsValue({
        name: emulator.name,
        website: emulator.website,
        state: emulator.state,
        releaseDate: emulator.releaseDate ? dayjs(emulator.releaseDate) : null,
        platformIds: emulator.platforms?.map((p) => p.id) || [],
        operatingSystemIds: emulator.operatingSystems?.map((os) => os.id) || [],
        icon: emulator.icon || null,
        screenshot: emulator.screenshot || null,
      });
    }
  }, [emulator, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        releaseDate: values.releaseDate ? values.releaseDate.format('YYYY-MM-DD') : null,
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

      <Form.Item label={t('state')} name="state">
        <Input />
      </Form.Item>

      <Form.Item label={t('release-date')} name="releaseDate">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={t('platforms')} name="platformIds">
        <PlatformSelect mode="multiple" />
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
