import { useLocalStorage } from '@guoyunhe/react-storage';
import type { ConfigProviderProps } from 'antd';
import { theme as antdTheme } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

type ThemeConfig = NonNullable<ConfigProviderProps['theme']>;

interface UseThemeModeResult {
  themeMode: ThemeMode;
  isDarkTheme: boolean;
  setThemeMode: Dispatch<SetStateAction<ThemeMode>>;
  toggleTheme: () => void;
  theme: ThemeConfig;
}

const THEME_STORAGE_KEY = 'retrobrainz-theme';

export default function useThemeMode(): UseThemeModeResult {
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(THEME_STORAGE_KEY, 'light');
  const isDarkTheme = themeMode === 'dark';
  const theme: ThemeConfig = {
    algorithm: isDarkTheme ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((currentThemeMode) => (currentThemeMode === 'dark' ? 'light' : 'dark'));
  };

  return {
    themeMode,
    isDarkTheme,
    setThemeMode,
    toggleTheme,
    theme,
  };
}
