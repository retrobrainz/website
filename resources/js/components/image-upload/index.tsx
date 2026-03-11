import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Button, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import type Image from '../../types/Image';

interface ImageUploadProps {
  value?: Image | null;
  onChange?: (image: Image | null) => void;
  width?: string | number;
  height?: string | number;
  format?: string;
  fit?: string;
}

export default function ImageUpload({
  value,
  onChange,
  width,
  height,
  format = 'avif',
  fit = 'cover',
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
      accept="image/*"
      listType="picture-card"
      maxCount={1}
      fileList={fileList}
      customRequest={({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('image', file);
        if (width) {
          formData.append('width', String(width));
        }
        if (height) {
          formData.append('height', String(height));
        }
        formData.append('format', format);
        formData.append('fit', fit);
        xior
          .post('/images', formData)
          .then((res) => {
            onChange?.(res.data);
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
