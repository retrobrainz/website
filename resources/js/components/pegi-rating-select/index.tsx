import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

export default function PegiRatingSelect(props: SelectProps<any>) {
  const { t } = useTranslation();

  const options = [
    { label: '3', value: '3' },
    { label: '7', value: '7' },
    { label: '12', value: '12' },
    { label: '16', value: '16' },
    { label: '18', value: '18' },
  ];

  return <Select {...props} options={options} allowClear placeholder={t('select')} />;
}
