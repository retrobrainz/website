import { supportedLocales } from '#config/i18n';
import vine from '@vinejs/vine';

export const titleTranslationStoreValidator = vine.create(
  vine.object({
    locale: vine.enum(supportedLocales),
    name: vine.string().maxLength(256),
  }),
);

export const titleTranslationUpdateValidator = vine.create(
  vine.object({
    locale: vine.enum(supportedLocales).optional(),
    name: vine.string().maxLength(256).optional(),
  }),
);
