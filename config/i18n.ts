import app from '@adonisjs/core/services/app';
import { defineConfig, formatters, loaders } from '@adonisjs/i18n';

export const supportedLocales = ['en', 'fr', 'es', 'de', 'it', 'ja', 'zh', 'ko', 'fi', 'pt'];

const i18nConfig = defineConfig({
  defaultLocale: 'en',
  supportedLocales,
  formatter: formatters.icu(),

  loaders: [
    loaders.fs({
      location: app.languageFilesPath(),
    }),
  ],
});

export default i18nConfig;
