import { Select, SelectProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import type Game from '../../types/Game';

interface GameSelectProps extends SelectProps<number | number[]> {
  excludeGameId?: number;
  platformId?: number | null;
}

export default function GameSelect({
  value,
  onChange,
  placeholder,
  excludeGameId,
  platformId,
  ...rest
}: GameSelectProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: games, loading } = useFetch<{ data: Game[] }>('/games', {
    params: {
      pageSize: 10,
      search: debouncedSearch || undefined,
      platformId: platformId ?? undefined,
    },
  });

  const selectedGameIds = useMemo(() => {
    if (Array.isArray(value)) {
      return value.filter((id): id is number => typeof id === 'number');
    }

    if (typeof value === 'number') {
      return [value];
    }

    return [];
  }, [value]);

  const missingSelectedGameIds = useMemo(() => {
    return selectedGameIds.filter(
      (id) => id !== excludeGameId && !games?.data?.some((game) => game.id === id),
    );
  }, [games?.data, excludeGameId, selectedGameIds]);

  const [selectedGames, setSelectedGames] = useState<Game[]>([]);

  useEffect(() => {
    if (missingSelectedGameIds.length === 0) {
      setSelectedGames([]);
      return;
    }

    let cancelled = false;

    Promise.all(
      missingSelectedGameIds.map((id) =>
        xior
          .get<Game>(`/games/${id}`)
          .then((res) => res.data)
          .catch(() => null),
      ),
    ).then((results) => {
      if (cancelled) {
        return;
      }

      setSelectedGames(results.filter((game): game is Game => !!game));
    });

    return () => {
      cancelled = true;
    };
  }, [missingSelectedGameIds]);

  const options = useMemo(() => {
    const merged = new Map<number, { label: string; value: number }>();

    selectedGames
      .filter((game) => game.id !== excludeGameId)
      .forEach((game) => {
        merged.set(game.id, { label: game.name, value: game.id });
      });

    (games?.data || [])
      .filter((game) => game.id !== excludeGameId)
      .forEach((game) => {
        if (!merged.has(game.id)) {
          merged.set(game.id, { label: game.name, value: game.id });
        }
      });

    return Array.from(merged.values());
  }, [games?.data, excludeGameId, selectedGames]);

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
