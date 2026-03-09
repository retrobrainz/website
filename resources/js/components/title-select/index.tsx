import { Select, SelectProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import type Title from '../../types/Title';

interface TitleSelectProps extends SelectProps<number | number[]> {
  excludeTitleId?: number;
}

export default function TitleSelect({
  value,
  onChange,
  placeholder,
  excludeTitleId,
  ...rest
}: TitleSelectProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: titles, loading } = useFetch<{ data: Title[] }>('/titles', {
    params: {
      pageSize: 10,
      search: debouncedSearch || undefined,
    },
  });

  const selectedTitleIds = useMemo(() => {
    if (Array.isArray(value)) {
      return value.filter((id): id is number => typeof id === 'number');
    }

    if (typeof value === 'number') {
      return [value];
    }

    return [];
  }, [value]);

  const missingSelectedTitleIds = useMemo(() => {
    return selectedTitleIds.filter(
      (id) => id !== excludeTitleId && !titles?.data?.some((title) => title.id === id),
    );
  }, [titles?.data, excludeTitleId, selectedTitleIds]);

  const [selectedTitles, setSelectedTitles] = useState<Title[]>([]);

  useEffect(() => {
    if (missingSelectedTitleIds.length === 0) {
      setSelectedTitles([]);
      return;
    }

    let cancelled = false;

    Promise.all(
      missingSelectedTitleIds.map((id) =>
        xior
          .get<Title>(`/titles/${id}`)
          .then((res) => res.data)
          .catch(() => null),
      ),
    ).then((results) => {
      if (cancelled) {
        return;
      }

      setSelectedTitles(results.filter((title): title is Title => !!title));
    });

    return () => {
      cancelled = true;
    };
  }, [missingSelectedTitleIds]);

  const options = useMemo(() => {
    const merged = new Map<number, { label: string; value: number }>();

    selectedTitles
      .filter((title) => title.id !== excludeTitleId)
      .forEach((title) => {
        merged.set(title.id, { label: title.name, value: title.id });
      });

    (titles?.data || [])
      .filter((title) => title.id !== excludeTitleId)
      .forEach((title) => {
        if (!merged.has(title.id)) {
          merged.set(title.id, { label: title.name, value: title.id });
        }
      });

    return Array.from(merged.values());
  }, [titles?.data, excludeTitleId, selectedTitles]);

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
