import { UploadOutlined } from '@ant-design/icons';
import { Button, Image, Upload } from 'antd';
import { useState } from 'react';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';
import Game from '../../types/Game.js';
import ImageModel from '../../types/Image.js';

export interface GameImageViewProps {
  game: Game;
  type: 'boxart' | 'titlescreen' | 'screenshot' | string;
  onUpload?: () => void;
}

export default function GameImageView({ game, type, onUpload }: GameImageViewProps) {
  const { isAuthenticated } = useAuth();
  const [uploadLoading, setUploadLoading] = useState(false);
  const image = game.images.find((img) => img.type === type)?.image;

  if (image) {
    return <Image src={image.url} alt={type} height={48} />;
  }

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
          .then((res) => xior.post(`/games/${game.id}/images`, { imageId: res.data.id, type }))
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
