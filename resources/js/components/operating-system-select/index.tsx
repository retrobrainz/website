import { Select } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import type OperatingSystem from '../../types/OperatingSystem.js';

interface OperatingSystemSelectProps {
  mode?: 'multiple' | 'tags';
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  placeholder?: string;
}

export default function OperatingSystemSelect({
  mode,
  value,
  onChange,
  placeholder,
}: OperatingSystemSelectProps) {
  const { t } = useTranslation();
  const { data: operatingSystems } = useFetch<OperatingSystem[]>('/operatingSystems');

  return (
    <Select
      mode={mode}
      value={value}
      onChange={onChange}
      placeholder={placeholder || t('select-operating-systems')}
      options={
        operatingSystems?.map((os) => ({
          label: `${os.name} (${os.arch})`,
          value: os.id,
        })) || []
      }
    />
  );
}
