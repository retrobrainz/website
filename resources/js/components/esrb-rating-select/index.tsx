import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

export const esrbRatingOptions = [
  { label: 'eC - Early Childhood', value: 'eC' },
  { label: 'KA - Kids to Adults', value: 'KA' },
  { label: 'E - Everyone', value: 'E' },
  { label: 'E10+ - Everyone 10+', value: 'E10+' },
  { label: 'T - Teen', value: 'T' },
  { label: 'M - Mature 17+', value: 'M' },
  { label: 'AO - Adults Only 18+', value: 'AO' },
  { label: 'RP - Rating Pending', value: 'RP' },
  { label: 'RP17+ - Rating Pending 17+', value: 'RP17+' },
];

export const esrbRatingLabelMap = Object.fromEntries(
  esrbRatingOptions.map((option) => [option.value, option.label]),
) as Record<string, string>;

export default function EsrbRatingSelect(props: SelectProps<any>) {
  const { t } = useTranslation();

  return <Select {...props} options={esrbRatingOptions} allowClear placeholder={t('select')} />;
}
