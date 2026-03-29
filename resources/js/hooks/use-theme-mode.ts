import { useMediaQuery } from '@guoyunhe/react-media-query';
import { useLocalStorage } from '@guoyunhe/react-storage';
import type { ConfigProviderProps } from 'antd';
import { theme as antdTheme } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef } from 'react';

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
  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
  const hasStoredTheme =
    typeof window !== 'undefined' &&
    (() => {
      const storedThemeMode = window.localStorage.getItem(THEME_STORAGE_KEY);
      return storedThemeMode === 'dark' || storedThemeMode === 'light';
    })();
  const followSystemThemeRef = useRef(!hasStoredTheme);

  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(
    THEME_STORAGE_KEY,
    prefersDarkTheme ? 'dark' : 'light',
  );
  const isDarkTheme = themeMode === 'dark';
  const theme: ThemeConfig = {
    algorithm: isDarkTheme ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  useEffect(() => {
    if (!followSystemThemeRef.current) {
      return;
    }

    setThemeMode(prefersDarkTheme ? 'dark' : 'light');
  }, [prefersDarkTheme, setThemeMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    followSystemThemeRef.current = false;
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
