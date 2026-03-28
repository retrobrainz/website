import { supportedLocales } from '#config/i18n';
import vine from '@vinejs/vine';

export const regionTranslationStoreValidator = vine.create(
  vine.object({
    locale: vine.enum(supportedLocales),
    name: vine.string().maxLength(64),
  }),
);

export const regionTranslationUpdateValidator = vine.create(
  vine.object({
    locale: vine.enum(supportedLocales).optional(),
    name: vine.string().maxLength(64).optional(),
  }),
);
