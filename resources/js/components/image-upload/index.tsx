import { Button, Upload } from 'antd';
import type { UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import type Image from '../../types/Image.js';

interface ImageUploadProps {
  value?: Image | null;
  onChange?: (imageId: number | null) => void;
  width?: string;
  height?: string;
  format?: string;
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
  accept?: string;
  maxCount?: number;
}

export default function ImageUpload({
  value,
  onChange,
  width,
  height,
  format = 'avif',
  listType = 'picture',
  accept = 'image/*',
  maxCount = 1,
}: ImageUploadProps) {
  const { t } = useTranslation();

  const fileList: UploadFile[] = value
    ? [
        {
          uid: String(value.id),
          name: 'image',
          status: 'done',
          url: value.url,
        },
      ]
    : [];

  return (
    <Upload
      accept={accept}
      listType={listType}
      maxCount={maxCount}
      fileList={fileList}
      customRequest={({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('image', file);
        if (width) {
          formData.append('width', width);
        }
        if (height) {
          formData.append('height', height);
        }
        formData.append('format', format);
        xior
          .post('/images', formData)
          .then((res) => {
            onChange?.(res.data.id);
            onSuccess?.(res.data);
          })
          .catch((e) => onError?.(e, e.response?.data));
      }}
      onRemove={() => {
        onChange?.(null);
      }}
    >
      <Button icon={<UploadOutlined />}>{t('upload')}</Button>
    </Upload>
  );
}
