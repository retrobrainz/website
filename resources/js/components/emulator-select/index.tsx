import { Select } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import type Emulator from '../../types/Emulator.js';

interface EmulatorSelectProps {
  mode?: 'multiple' | 'tags';
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  placeholder?: string;
}

export default function EmulatorSelect({
  mode,
  value,
  onChange,
  placeholder,
}: EmulatorSelectProps) {
  const { t } = useTranslation();
  const { data: emulators } = useFetch<{ data: Emulator[] }>('/emulators', {
    params: { pageSize: 100 },
  });

  return (
    <Select
      mode={mode}
      value={value}
      onChange={onChange}
      placeholder={placeholder || t('select')}
      options={emulators?.data.map((e) => ({ label: e.name, value: e.id })) || []}
    />
  );
}
