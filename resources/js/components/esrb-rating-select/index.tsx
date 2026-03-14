import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

export default function EsrbRatingSelect(props: SelectProps<any>) {
  const { t } = useTranslation();

  const options = [
    { label: 'eC - Early Childhood', value: 'eC' },
    { label: 'E - Everyone (Formerly KA)', value: 'E' },
    { label: 'E10+ - Everyone 10+', value: 'E10+' },
    { label: 'T - Teen', value: 'T' },
    { label: 'M - Mature 17+', value: 'M' },
    { label: 'AO - Adults Only 18+', value: 'AO' },
    { label: 'RP - Rating Pending', value: 'RP' },
    { label: 'RP17+ - Rating Pending 17+', value: 'RP17+' },
  ];

  return <Select {...props} options={options} allowClear placeholder={t('select')} />;
}
