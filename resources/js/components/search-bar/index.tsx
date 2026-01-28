import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'wouter';

export default function SearchBar() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const [search, setSearch] = useState(q);

  useEffect(() => {
    setSearch(q);
  }, [q]);

  const handleSearch = () => {
    if (search.trim()) {
      setLocation(`/search?q=${encodeURIComponent(search.trim())}`);
    } else {
      setLocation('/search');
    }
  };

  return (
    <Input.Search
      placeholder={t('search-games')}
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      onSearch={handleSearch}
      style={{ width: 200 }}
      allowClear
      aria-label={t('search-games')}
    />
  );
}
