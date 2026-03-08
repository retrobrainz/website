import { Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import type Company from '../../types/Company';

interface CompanySelectProps {
  value?: number;
  onChange?: (value: number | undefined) => void;
  placeholder?: string;
  allowClear?: boolean;
}

export default function CompanySelect({
  value,
  onChange,
  placeholder,
  allowClear,
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
    !hasSearch &&
    !companies?.data?.some((company) => company.id === value);

  const { data: selectedCompany, loading: selectedCompanyLoading } = useFetch<Company>(
    `/companies/${value || 0}`,
    {
      disabled: !shouldFetchSelectedCompany,
    },
  );

  const options = useMemo(() => {
    const companyOptions =
      companies?.data?.map((company) => ({
        label: company.name,
        value: company.id,
      })) || [];

    if (hasSearch || !selectedCompany) {
      return companyOptions;
    }

    if (companyOptions.some((option) => option.value === selectedCompany.id)) {
      return companyOptions;
    }

    return [{ label: selectedCompany.name, value: selectedCompany.id }, ...companyOptions];
  }, [companies?.data, hasSearch, selectedCompany]);

  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder || t('select')}
      allowClear={allowClear}
      showSearch
      filterOption={false}
      onSearch={setSearch}
      options={options}
      loading={loading || selectedCompanyLoading}
    />
  );
}
