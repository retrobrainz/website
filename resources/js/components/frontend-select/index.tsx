import { Select } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import type Frontend from '../../types/Frontend';

interface FrontendSelectProps {
  mode?: 'multiple' | 'tags';
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  placeholder?: string;
}

export default function FrontendSelect({
  mode,
  value,
  onChange,
  placeholder,
}: FrontendSelectProps) {
  const { t } = useTranslation();
  const { data: frontends } = useFetch<{ data: Frontend[] }>('/frontends', {
    params: { pageSize: 100 },
  });

  return (
    <Select
      mode={mode}
      value={value}
      onChange={onChange}
      placeholder={placeholder || t('select')}
      options={frontends?.data.map((f) => ({ label: f.name, value: f.id })) || []}
    />
  );
}
