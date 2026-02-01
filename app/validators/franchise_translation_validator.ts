import { supportedLocales } from '#config/i18n';
import vine from '@vinejs/vine';

export const franchiseTranslationStoreValidator = vine.create(
  vine.object({
    locale: vine.enum(supportedLocales),
    name: vine.string().maxLength(256),
  }),
);

export const franchiseTranslationUpdateValidator = vine.create(
  vine.object({
    locale: vine.enum(supportedLocales).optional(),
    name: vine.string().maxLength(256).optional(),
  }),
);
