import { Select, SelectProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import type Company from '../../types/Company';

interface CompanySelectProps extends SelectProps<number> {
  excludeCompanyId?: number;
}

export default function CompanySelect({
  value,
  onChange,
  placeholder,
  excludeCompanyId,
  ...rest
}: CompanySelectProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: companies, loading } = useFetch<{ data: Company[] }>('/companies', {
    params: {
      pageSize: 10,
      search: debouncedSearch || undefined,
    },
  });

  const hasSearch = search.trim().length > 0;

  const shouldFetchSelectedCompany =
    typeof value === 'number' &&
    value !== excludeCompanyId &&
    !hasSearch &&
    !companies?.data?.some((company) => company.id === value);

  const { data: selectedCompany } = useFetch<Company>(`/companies/${value}`, {
    disabled: !shouldFetchSelectedCompany,
  });

  const options = useMemo(() => {
    const companyOptions =
      companies?.data
        ?.map((company) => ({
          label: company.name,
          value: company.id,
        }))
        .filter((option) => option.value !== excludeCompanyId) || [];

    if (hasSearch || !selectedCompany) {
      return companyOptions;
    }

    if (companyOptions.some((option) => option.value === selectedCompany.id)) {
      return companyOptions;
    }

    return [{ label: selectedCompany.name, value: selectedCompany.id }, ...companyOptions];
  }, [companies?.data, excludeCompanyId, hasSearch, selectedCompany]);

  return (
    <Select
      {...rest}
      value={value}
      onChange={onChange}
      placeholder={placeholder || t('select')}
      showSearch
      filterOption={false}
      onSearch={setSearch}
      options={options}
      loading={loading}
    />
  );
}
