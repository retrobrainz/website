import { SwapOutlined } from '@ant-design/icons';
import { App, Button, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import xior from 'xior';
import type Franchise from '../../types/Franchise';
import FranchiseSelect from '../franchise-select';

interface FranchiseMergeButtonProps {
  franchiseId: number;
}

export default function FranchiseMergeButton({ franchiseId }: FranchiseMergeButtonProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [targetFranchiseId, setTargetFranchiseId] = useState<number | undefined>();
  const [merging, setMerging] = useState(false);

  const handleMerge = async () => {
    if (!targetFranchiseId) {
      return;
    }

    setMerging(true);
    try {
      const response = await xior.post<Franchise>(`/franchises/${franchiseId}/merge`, {
        targetFranchiseId,
      });
      message.success(t('merge-success'));
      setMergeModalOpen(false);
      setTargetFranchiseId(undefined);
      setLocation(`/franchises/${response.data.id}`);
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
        title={t('merge-franchise')}
        open={mergeModalOpen}
        onCancel={() => {
          if (!merging) {
            setMergeModalOpen(false);
            setTargetFranchiseId(undefined);
          }
        }}
        onOk={handleMerge}
        okText={t('merge')}
        cancelText={t('cancel')}
        okButtonProps={{ disabled: !targetFranchiseId, loading: merging }}
      >
        <Typography.Paragraph>{t('merge-franchise-description')}</Typography.Paragraph>
        <FranchiseSelect
          value={targetFranchiseId}
          onChange={setTargetFranchiseId}
          excludeFranchiseId={franchiseId}
          style={{ width: '100%' }}
        />
      </Modal>
    </>
  );
}
