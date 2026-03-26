import { SwapOutlined } from '@ant-design/icons';
import { App, Button, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import xior from 'xior';
import type Genre from '../../types/Genre';
import GenreSelect from '../genre-select';

interface GenreMergeButtonProps {
  genreId: number;
}

export default function GenreMergeButton({ genreId }: GenreMergeButtonProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [targetGenreId, setTargetGenreId] = useState<number | undefined>();
  const [merging, setMerging] = useState(false);

  const handleMerge = async () => {
    if (!targetGenreId) {
      return;
    }

    setMerging(true);
    try {
      const response = await xior.post<Genre>(`/genres/${genreId}/merge`, {
        targetGenreId,
      });
      message.success(t('merge-success'));
      setMergeModalOpen(false);
      setTargetGenreId(undefined);
      setLocation(`/genres/${response.data.id}`);
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      setMerging(false);
    }
  };

  return (
    <>
      <Button danger icon={<SwapOutlined />} onClick={() => setMergeModalOpen(true)}>
        {t('merge')}
      </Button>

      <Modal
        title={t('merge-genre')}
        open={mergeModalOpen}
        onCancel={() => {
          if (!merging) {
            setMergeModalOpen(false);
            setTargetGenreId(undefined);
          }
        }}
        onOk={handleMerge}
        okText={t('merge')}
        cancelText={t('cancel')}
        okButtonProps={{ disabled: !targetGenreId, loading: merging }}
      >
        <Typography.Paragraph>{t('merge-genre-description')}</Typography.Paragraph>
        <GenreSelect
          value={targetGenreId}
          onChange={(value) => setTargetGenreId(typeof value === 'number' ? value : undefined)}
          excludeGenreId={genreId}
          style={{ width: '100%' }}
        />
      </Modal>
    </>
  );
}
