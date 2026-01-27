import { UploadOutlined } from '@ant-design/icons';
import { Button, Image, Modal, Table, Upload } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';
import Game from '../../types/Game.js';
import ImageModel from '../../types/Image.js';

export interface ImageUploadProps {
  game: Game;
  type: 'boxart' | 'titlescreen' | 'screenshot' | 'logo' | string;
  onFinish?: () => void;
}

export default function ImageUpload({ game, type, onFinish }: ImageUploadProps) {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState<number>(-1);

  const { data: games } = useFetch<{ data: Game[] }>('/games', {
    params: {
      platformId: game.platformId,
      search: game.name.substring(0, game.name.indexOf('(')).trim(),
    },
    disabled: !open,
  });

  if (!isAuthenticated) {
    return null;
  }

  const filteredGames = games?.data?.filter((g) => !!g[type as keyof Game]) || [];

  return (
    <>
      <Button icon={<UploadOutlined />} onClick={() => setOpen(true)} />

      <Modal title={t('upload-image')} open={open} footer={null} onCancel={() => setOpen(false)}>
        <Upload
          accept="image/*"
          showUploadList={false}
          customRequest={({ file }) => {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('type', 'avif');
            formData.append('fit', 'inside');
            if (type === 'boxart') {
              formData.append('width', '1024');
              formData.append('height', '1024');
            } else if (game.platform) {
              formData.append('width', game.platform.screenWidth.toString());
              formData.append('height', game.platform.screenHeight.toString());
            }
            setSubmitLoading(0);
            xior
              .post<ImageModel>(`/images`, formData)
              .then((res) => xior.put(`/games/${game.id}`, { [`${type}Id`]: res.data.id }))
              .then(() => {
                onFinish?.();
              })
              .finally(() => {
                setSubmitLoading(-1);
              });
          }}
        >
          <Button
            icon={<UploadOutlined />}
            loading={submitLoading === 0}
            style={{ marginRight: 12 }}
          >
            {t('upload')}
          </Button>
        </Upload>

        <span>{t('or-reuse-from-existing')}</span>

        <Table
          dataSource={filteredGames}
          rowKey="id"
          columns={[
            {
              dataIndex: type,
              title: t('image'),
              render: (image) => <Image src={image.url} alt="img" style={{ maxHeight: 48 }} />,
            },
            {
              dataIndex: 'name',
              title: t('game'),
            },
            {
              dataIndex: type,
              title: t('action'),
              render: (image, record) => (
                <Button
                  onClick={() => {
                    setSubmitLoading(record.id);
                    xior
                      .put(`/games/${game.id}`, { [`${type}Id`]: image.id })
                      .then(() => {
                        onFinish?.();
                      })
                      .finally(() => {
                        setSubmitLoading(-1);
                      });
                  }}
                  loading={submitLoading === record.id}
                >
                  {t('reuse')}
                </Button>
              ),
            },
          ]}
          pagination={false}
          style={{ marginTop: 16 }}
        />
      </Modal>
    </>
  );
}
