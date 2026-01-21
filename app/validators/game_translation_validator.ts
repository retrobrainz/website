import vine from '@vinejs/vine';

export const gameTranslationStoreValidator = vine.create(
  vine.object({
    locale: vine.string().maxLength(5),
    name: vine.string().maxLength(256),
  }),
);

export const gameTranslationUpdateValidator = vine.create(
  vine.object({
    locale: vine.string().maxLength(5).optional(),
    name: vine.string().maxLength(256).optional(),
  }),
);
