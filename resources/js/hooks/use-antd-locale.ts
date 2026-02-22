import { Locale } from 'antd/es/locale';
import { useEffect, useState } from 'react';

const localeMap: Record<string, () => Promise<{ default: Locale }>> = {
  de: () => import('antd/es/locale/de_DE'),
  es: () => import('antd/es/locale/es_ES'),
  fi: () => import('antd/es/locale/fi_FI'),
  fr: () => import('antd/es/locale/fr_FR'),
  it: () => import('antd/es/locale/it_IT'),
  ja: () => import('antd/es/locale/ja_JP'),
  ko: () => import('antd/es/locale/ko_KR'),
  pt: () => import('antd/es/locale/pt_PT'),
  'zh-CN': () => import('antd/es/locale/zh_CN'),
  'zh-TW': () => import('antd/es/locale/zh_TW'),
  ru: () => import('antd/es/locale/ru_RU'),
  da: () => import('antd/es/locale/da_DK'),
  sv: () => import('antd/es/locale/sv_SE'),
};

export default function useAntdLocale(language: string) {
  const [locale, setLocale] = useState<Locale>();

  useEffect(() => {
    const loadLocale = async () => {
      try {
        const localeLoader = localeMap[language];
        if (localeLoader) {
          const loadedLocale = await localeLoader();
          setLocale(loadedLocale.default);
        } else {
          setLocale(undefined);
        }
      } catch (error) {
        console.error('Error loading Ant Design locale:', error);
        setLocale(undefined);
      }
    };
    loadLocale();
  }, [language]);

  return locale;
}
