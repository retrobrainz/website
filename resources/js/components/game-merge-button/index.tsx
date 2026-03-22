import { SwapOutlined } from '@ant-design/icons';
import { App, Button, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import xior from 'xior';
import type Game from '../../types/Game';
import GameSelect from '../game-select';

interface GameMergeButtonProps {
  gameId: number;
  platformId: number | null;
}

export default function GameMergeButton({ gameId, platformId }: GameMergeButtonProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [targetGameId, setTargetGameId] = useState<number | undefined>();
  const [merging, setMerging] = useState(false);

  const handleMerge = async () => {
    if (!targetGameId) {
      return;
    }

    setMerging(true);
    try {
      const response = await xior.post<Game>(`/games/${gameId}/merge`, {
        targetGameId,
      });
      message.success(t('merge-success'));
      setMergeModalOpen(false);
      setTargetGameId(undefined);
      setLocation(`/platforms/${response.data.platformId}/games/${response.data.id}`);
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
        title={t('merge-game')}
        open={mergeModalOpen}
        onCancel={() => {
          if (!merging) {
            setMergeModalOpen(false);
            setTargetGameId(undefined);
          }
        }}
        onOk={handleMerge}
        okText={t('merge')}
        cancelText={t('cancel')}
        okButtonProps={{ disabled: !targetGameId, loading: merging }}
      >
        <Typography.Paragraph>{t('merge-game-description')}</Typography.Paragraph>
        <GameSelect
          value={targetGameId}
          onChange={(value) => setTargetGameId(typeof value === 'number' ? value : undefined)}
          excludeGameId={gameId}
          platformId={platformId}
          style={{ width: '100%' }}
        />
      </Modal>
    </>
  );
}
