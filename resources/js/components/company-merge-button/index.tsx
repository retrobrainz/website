import { SwapOutlined } from '@ant-design/icons';
import { App, Button, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import xior from 'xior';
import type Company from '../../types/Company';
import CompanySelect from '../company-select';

interface CompanyMergeButtonProps {
  companyId: number;
}

export default function CompanyMergeButton({ companyId }: CompanyMergeButtonProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [targetCompanyId, setTargetCompanyId] = useState<number | undefined>();
  const [merging, setMerging] = useState(false);

  const handleMerge = async () => {
    if (!targetCompanyId) {
      return;
    }

    setMerging(true);
    try {
      const response = await xior.post<Company>(`/companies/${companyId}/merge`, {
        targetCompanyId,
      });
      message.success(t('merge-success'));
      setMergeModalOpen(false);
      setTargetCompanyId(undefined);
      setLocation(`/companies/${response.data.id}`);
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
        title={t('merge-company')}
        open={mergeModalOpen}
        onCancel={() => {
          if (!merging) {
            setMergeModalOpen(false);
            setTargetCompanyId(undefined);
          }
        }}
        onOk={handleMerge}
        okText={t('merge')}
        cancelText={t('cancel')}
        okButtonProps={{ disabled: !targetCompanyId, loading: merging }}
      >
        <Typography.Paragraph>{t('merge-company-description')}</Typography.Paragraph>
        <CompanySelect
          value={targetCompanyId}
          onChange={setTargetCompanyId}
          excludeCompanyId={companyId}
          style={{ width: '100%' }}
        />
      </Modal>
    </>
  );
}
