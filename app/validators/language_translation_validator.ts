import { supportedLocales } from '#config/i18n';
import vine from '@vinejs/vine';

export const languageTranslationStoreValidator = vine.create(
  vine.object({
    locale: vine.enum(supportedLocales),
    name: vine.string().maxLength(32),
  }),
);

export const languageTranslationUpdateValidator = vine.create(
  vine.object({
    locale: vine.enum(supportedLocales).optional(),
    name: vine.string().maxLength(32).optional(),
  }),
);
