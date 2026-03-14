import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

export const pegiRatingOptions = [
  { label: '3', value: '3' },
  { label: '7', value: '7' },
  { label: '12', value: '12' },
  { label: '16', value: '16' },
  { label: '18', value: '18' },
];

export const pegiRatingLabelMap = Object.fromEntries(
  pegiRatingOptions.map((option) => [option.value, option.label]),
) as Record<string, string>;

export default function PegiRatingSelect(props: SelectProps<any>) {
  const { t } = useTranslation();

  return <Select {...props} options={pegiRatingOptions} allowClear placeholder={t('select')} />;
}
