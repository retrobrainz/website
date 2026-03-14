import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

export const ceroRatingOptions = [
  { label: 'A - All Ages', value: 'A' },
  { label: 'B - Ages 12+', value: 'B' },
  { label: 'C - Ages 15+', value: 'C' },
  { label: 'D - Ages 17+', value: 'D' },
  { label: 'Z - Ages 18+ (Restricted)', value: 'Z' },
  { label: '0 - All Ages (Old)', value: '0' },
  { label: '12 - Ages 12+ (Old)', value: '12' },
  { label: '15 - Ages 15+ (Old)', value: '15' },
  { label: '18 - Ages 18+ (Old)', value: '18' },
];

export const ceroRatingLabelMap = Object.fromEntries(
  ceroRatingOptions.map((option) => [option.value, option.label]),
) as Record<string, string>;

export default function CeroRatingSelect(props: SelectProps<any>) {
  const { t } = useTranslation();

  return <Select {...props} options={ceroRatingOptions} allowClear placeholder={t('select')} />;
}
