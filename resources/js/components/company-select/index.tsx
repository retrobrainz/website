import { Select, SelectProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import type Company from '../../types/Company';

interface CompanySelectProps extends SelectProps<number | number[]> {
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

  const selectedCompanyIds = useMemo(() => {
    if (Array.isArray(value)) {
      return value.filter((id): id is number => typeof id === 'number');
    }

    if (typeof value === 'number') {
      return [value];
    }

    return [];
  }, [value]);

  const missingSelectedCompanyIds = useMemo(() => {
    return selectedCompanyIds.filter(
      (id) => id !== excludeCompanyId && !companies?.data?.some((company) => company.id === id),
    );
  }, [companies?.data, excludeCompanyId, selectedCompanyIds]);

  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);

  useEffect(() => {
    if (missingSelectedCompanyIds.length === 0) {
      setSelectedCompanies([]);
      return;
    }

    let cancelled = false;

    Promise.all(
      missingSelectedCompanyIds.map((id) =>
        xior
          .get<Company>(`/companies/${id}`)
          .then((res) => res.data)
          .catch(() => null),
      ),
    ).then((results) => {
      if (cancelled) {
        return;
      }

      setSelectedCompanies(results.filter((company): company is Company => !!company));
    });

    return () => {
      cancelled = true;
    };
  }, [missingSelectedCompanyIds]);

  const options = useMemo(() => {
    const merged = new Map<number, { label: string; value: number }>();

    selectedCompanies
      .filter((company) => company.id !== excludeCompanyId)
      .forEach((company) => {
        merged.set(company.id, { label: company.name, value: company.id });
      });

    (companies?.data || [])
      .filter((company) => company.id !== excludeCompanyId)
      .forEach((company) => {
        if (!merged.has(company.id)) {
          merged.set(company.id, { label: company.name, value: company.id });
        }
      });

    return Array.from(merged.values());
  }, [companies?.data, excludeCompanyId, selectedCompanies]);

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
