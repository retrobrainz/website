import { Select } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import type Platform from '../../types/Platform.js';

interface PlatformSelectProps {
  mode?: 'multiple' | 'tags';
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  placeholder?: string;
}

export default function PlatformSelect({
  mode,
  value,
  onChange,
  placeholder,
}: PlatformSelectProps) {
  const { t } = useTranslation();
  const { data: platforms } = useFetch<Platform[]>('/platforms');

  return (
    <Select
      mode={mode}
      value={value}
      onChange={onChange}
      placeholder={placeholder || t('select-platforms')}
      options={platforms?.map((p) => ({ label: p.name, value: p.id })) || []}
    />
  );
}
