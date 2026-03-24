import { App, Button, DatePicker, Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type Platform from '../../types/Platform';
import AskGoogle from '../ask-google';
import CompanySelect from '../company-select';
import EmulatorSelect from '../emulator-select';
import ImageUpload from '../image-upload';

interface PlatformFormProps {
  platform?: Platform;
  onSubmit: (values: any) => Promise<void>;
  submitText: string;
}

export default function PlatformForm({ platform, onSubmit, submitText }: PlatformFormProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const name = Form.useWatch('name', form);

  useEffect(() => {
    if (platform) {
      form.setFieldsValue({
        name: platform.name,
        abbr: platform.abbr,
        wikipedia: platform.wikipedia,
        companyId: platform.company?.id || null,
        screenWidth: platform.screenWidth,
        screenHeight: platform.screenHeight,
        releaseDate: platform.releaseDate ? dayjs(platform.releaseDate) : null,
        emulatorIds: platform.emulators?.map((emulator) => emulator.id) || [],
        logo: platform.logo || null,
        photo: platform.photo || null,
      });
    }
  }, [platform, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        releaseDate: values.releaseDate ? values.releaseDate.format('YYYY-MM-DD') : null,
        logoId: values.logo?.id || null,
        photoId: values.photo?.id || null,
      };
      delete payload.logo;
      delete payload.photo;
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

      <Form.Item label={t('abbr')} name="abbr">
        <Input maxLength={8} />
      </Form.Item>

      <Form.Item
        label={t('wikipedia')}
        name="wikipedia"
        extra={<AskGoogle query={`wikipedia link of platform "${name}"`} />}
      >
        <Input type="url" />
      </Form.Item>

      <Form.Item label={t('companies')} name="companyId" rules={[{ required: true }]}>
        <CompanySelect />
      </Form.Item>

      <Form.Item label={t('screen-width')} name="screenWidth" rules={[{ required: true }]}>
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={t('screen-height')} name="screenHeight" rules={[{ required: true }]}>
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={t('release-date')} name="releaseDate">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={t('emulators')} name="emulatorIds">
        <EmulatorSelect mode="multiple" />
      </Form.Item>

      <Form.Item label={t('logo')} name="logo">
        <ImageUpload width="512" height="512" fit="inside" />
      </Form.Item>

      <Form.Item label={t('image')} name="photo">
        <ImageUpload width="1280" height="720" fit="inside" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
