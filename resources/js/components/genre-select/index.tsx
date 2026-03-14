import { Select, SelectProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import type Genre from '../../types/Genre';

interface GenreSelectProps extends SelectProps<number | number[]> {
  excludeGenreId?: number;
}

export default function GenreSelect({
  value,
  onChange,
  placeholder,
  excludeGenreId,
  ...rest
}: GenreSelectProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: genres, loading } = useFetch<{ data: Genre[] }>('/genres', {
    params: {
      pageSize: 10,
      search: debouncedSearch || undefined,
    },
  });

  const selectedGenreIds = useMemo(() => {
    if (Array.isArray(value)) {
      return value.filter((id): id is number => typeof id === 'number');
    }

    if (typeof value === 'number') {
      return [value];
    }

    return [];
  }, [value]);

  const missingSelectedGenreIds = useMemo(() => {
    return selectedGenreIds.filter(
      (id) => id !== excludeGenreId && !genres?.data?.some((genre) => genre.id === id),
    );
  }, [genres?.data, excludeGenreId, selectedGenreIds]);

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (missingSelectedGenreIds.length === 0) {
      setSelectedGenres([]);
      return;
    }

    let cancelled = false;

    Promise.all(
      missingSelectedGenreIds.map((id) =>
        xior
          .get<Genre>(`/genres/${id}`)
          .then((res) => res.data)
          .catch(() => null),
      ),
    ).then((results) => {
      if (cancelled) {
        return;
      }

      setSelectedGenres(results.filter((genre): genre is Genre => !!genre));
    });

    return () => {
      cancelled = true;
    };
  }, [missingSelectedGenreIds]);

  const options = useMemo(() => {
    const merged = new Map<number, { label: string; value: number }>();

    selectedGenres
      .filter((genre) => genre.id !== excludeGenreId)
      .forEach((genre) => {
        const label = genre.translations?.[0]?.name || genre.name;
        merged.set(genre.id, { label, value: genre.id });
      });

    (genres?.data || [])
      .filter((genre) => genre.id !== excludeGenreId)
      .forEach((genre) => {
        if (!merged.has(genre.id)) {
          const label = genre.translations?.[0]?.name || genre.name;
          merged.set(genre.id, { label, value: genre.id });
        }
      });

    return Array.from(merged.values());
  }, [genres?.data, excludeGenreId, selectedGenres]);

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
