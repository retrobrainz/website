import { Select, SelectProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import type Franchise from '../../types/Franchise';

interface FranchiseSelectProps extends SelectProps<number | number[]> {
  excludeFranchiseId?: number;
}

export default function FranchiseSelect({
  value,
  onChange,
  placeholder,
  excludeFranchiseId,
  ...rest
}: FranchiseSelectProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: franchises, loading } = useFetch<{ data: Franchise[] }>('/franchises', {
    params: {
      pageSize: 10,
      search: debouncedSearch || undefined,
    },
  });

  const selectedFranchiseIds = useMemo(() => {
    if (Array.isArray(value)) {
      return value.filter((id): id is number => typeof id === 'number');
    }

    if (typeof value === 'number') {
      return [value];
    }

    return [];
  }, [value]);

  const missingSelectedFranchiseIds = useMemo(() => {
    return selectedFranchiseIds.filter(
      (id) =>
        id !== excludeFranchiseId && !franchises?.data?.some((franchise) => franchise.id === id),
    );
  }, [franchises?.data, excludeFranchiseId, selectedFranchiseIds]);

  const [selectedFranchises, setSelectedFranchises] = useState<Franchise[]>([]);

  useEffect(() => {
    if (missingSelectedFranchiseIds.length === 0) {
      setSelectedFranchises([]);
      return;
    }

    let cancelled = false;

    Promise.all(
      missingSelectedFranchiseIds.map((id) =>
        xior
          .get<Franchise>(`/franchises/${id}`)
          .then((res) => res.data)
          .catch(() => null),
      ),
    ).then((results) => {
      if (cancelled) {
        return;
      }

      setSelectedFranchises(results.filter((franchise): franchise is Franchise => !!franchise));
    });

    return () => {
      cancelled = true;
    };
  }, [missingSelectedFranchiseIds]);

  const options = useMemo(() => {
    const merged = new Map<number, { label: string; value: number }>();

    selectedFranchises
      .filter((franchise) => franchise.id !== excludeFranchiseId)
      .forEach((franchise) => {
        merged.set(franchise.id, { label: franchise.name, value: franchise.id });
      });

    (franchises?.data || [])
      .filter((franchise) => franchise.id !== excludeFranchiseId)
      .forEach((franchise) => {
        if (!merged.has(franchise.id)) {
          merged.set(franchise.id, { label: franchise.name, value: franchise.id });
        }
      });

    return Array.from(merged.values());
  }, [franchises?.data, excludeFranchiseId, selectedFranchises]);

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
