import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import FetchBackend from 'i18next-fetch-backend';
import { initReactI18next } from 'react-i18next';

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' },
];

i18next
  .use(FetchBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: languages.map((lang) => lang.code),
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    backend: { loadPath: '/static/lang/{{lng}}/{{ns}}.json' },
    detection: {
      // order and from where user language should be detected
      order: ['navigator', 'localStorage', 'querystring'],

      // keys or params to lookup language from
      lookupQuerystring: 'locale',
      lookupLocalStorage: 'locale',

      caches: ['localStorage'],
    },
  });
