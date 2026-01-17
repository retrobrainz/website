import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { useState } from 'react';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';
import Game from '../../types/Game.js';
import ImageModel from '../../types/Image.js';

export interface ImageUploadProps {
  game: Game;
  type: 'boxart' | 'title' | 'snap' | string;
  onUpload?: () => void;
}

export default function ImageUpload({ game, type, onUpload }: ImageUploadProps) {
  const { isAuthenticated } = useAuth();
  const [uploadLoading, setUploadLoading] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Upload
      accept="image/jpeg, image/png"
      showUploadList={false}
      customRequest={({ file }) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', 'jpeg');
        formData.append('fit', 'inside');
        if (type === 'boxart') {
          formData.append('width', '1024');
          formData.append('height', '1024');
        } else if (game.platform) {
          formData.append('width', game.platform.screenWidth.toString());
          formData.append('height', game.platform.screenHeight.toString());
        }
        setUploadLoading(true);
        xior
          .post<ImageModel>(`/images`, formData)
          .then((res) => xior.put(`/games/${game.id}`, { [`${type}Id`]: res.data.id }))
          .then(() => {
            onUpload?.();
          })
          .finally(() => {
            setUploadLoading(false);
          });
      }}
    >
      <Button icon={<UploadOutlined />} loading={uploadLoading} />
    </Upload>
  );
}
