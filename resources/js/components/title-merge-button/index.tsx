import { SwapOutlined } from '@ant-design/icons';
import { App, Button, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import xior from 'xior';
import type Title from '../../types/Title';
import TitleSelect from '../title-select';

interface TitleMergeButtonProps {
  titleId: number;
}

export default function TitleMergeButton({ titleId }: TitleMergeButtonProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [targetTitleId, setTargetTitleId] = useState<number | undefined>();
  const [merging, setMerging] = useState(false);

  const handleMerge = async () => {
    if (!targetTitleId) {
      return;
    }

    setMerging(true);
    try {
      const response = await xior.post<Title>(`/titles/${titleId}/merge`, {
        targetTitleId,
      });
      message.success(t('merge-success'));
      setMergeModalOpen(false);
      setTargetTitleId(undefined);
      setLocation(`/titles/${response.data.id}`);
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
        title={t('merge-title')}
        open={mergeModalOpen}
        onCancel={() => {
          if (!merging) {
            setMergeModalOpen(false);
            setTargetTitleId(undefined);
          }
        }}
        onOk={handleMerge}
        okText={t('merge')}
        cancelText={t('cancel')}
        okButtonProps={{ disabled: !targetTitleId, loading: merging }}
      >
        <Typography.Paragraph>{t('merge-title-description')}</Typography.Paragraph>
        <TitleSelect
          value={targetTitleId}
          onChange={setTargetTitleId}
          excludeTitleId={titleId}
          style={{ width: '100%' }}
        />
      </Modal>
    </>
  );
}
