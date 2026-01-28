import { App, Button, DatePicker, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import type Emulator from '../../types/Emulator.js';
import type OperatingSystem from '../../types/OperatingSystem.js';
import type Platform from '../../types/Platform.js';

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
  const { data: platforms } = useFetch<Platform[]>('/api/platforms');
  const { data: operatingSystems } = useFetch<OperatingSystem[]>('/api/operatingSystems');
  const [iconId, setIconId] = useState<number | null>(emulator?.iconId || null);
  const [screenshotId, setScreenshotId] = useState<number | null>(emulator?.screenshotId || null);

  useEffect(() => {
    if (emulator) {
      form.setFieldsValue({
        name: emulator.name,
        website: emulator.website,
        state: emulator.state,
        releaseDate: emulator.releaseDate ? dayjs(emulator.releaseDate) : null,
        platformIds: emulator.platforms?.map((p) => p.id) || [],
        operatingSystemIds: emulator.operatingSystems?.map((os) => os.id) || [],
      });
    }
  }, [emulator, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        releaseDate: values.releaseDate ? values.releaseDate.format('YYYY-MM-DD') : null,
        iconId,
        screenshotId,
      };
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
        <Select
          mode="multiple"
          placeholder={t('select-platforms')}
          options={platforms?.map((p) => ({ label: p.name, value: p.id })) || []}
        />
      </Form.Item>

      <Form.Item label={t('operating-systems')} name="operatingSystemIds">
        <Select
          mode="multiple"
          placeholder={t('select-operating-systems')}
          options={operatingSystems?.map((os) => ({ label: os.name, value: os.id })) || []}
        />
      </Form.Item>

      <Form.Item label={t('icon')}>
        <Upload
          accept="image/*"
          listType="picture"
          maxCount={1}
          defaultFileList={
            emulator?.icon
              ? [
                  {
                    uid: String(emulator.icon.id),
                    name: 'icon',
                    status: 'done',
                    url: emulator.icon.url,
                  },
                ]
              : []
          }
          customRequest={({ file, onSuccess, onError }) => {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('width', '256');
            formData.append('height', '256');
            formData.append('format', 'avif');
            xior
              .post('/api/images', formData)
              .then((res) => {
                setIconId(res.data.id);
                onSuccess?.(res.data);
              })
              .catch((e) => onError?.(e, e.response?.data));
          }}
          onRemove={() => {
            setIconId(null);
          }}
        >
          <Button icon={<UploadOutlined />}>{t('upload')}</Button>
        </Upload>
      </Form.Item>

      <Form.Item label={t('screenshot')}>
        <Upload
          accept="image/*"
          listType="picture"
          maxCount={1}
          defaultFileList={
            emulator?.screenshot
              ? [
                  {
                    uid: String(emulator.screenshot.id),
                    name: 'screenshot',
                    status: 'done',
                    url: emulator.screenshot.url,
                  },
                ]
              : []
          }
          customRequest={({ file, onSuccess, onError }) => {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('format', 'avif');
            xior
              .post('/api/images', formData)
              .then((res) => {
                setScreenshotId(res.data.id);
                onSuccess?.(res.data);
              })
              .catch((e) => onError?.(e, e.response?.data));
          }}
          onRemove={() => {
            setScreenshotId(null);
          }}
        >
          <Button icon={<UploadOutlined />}>{t('upload')}</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
