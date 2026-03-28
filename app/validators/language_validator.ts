import vine from '@vinejs/vine';

export const createLanguageValidator = vine.create(
  vine.object({
    code: vine.string().trim().minLength(2).maxLength(2).unique({
      table: 'languages',
      column: 'code',
    }),
    name: vine.string().trim().minLength(1).maxLength(32).unique({
      table: 'languages',
      column: 'name',
    }),
  }),
);

export const updateLanguageValidator = vine.create(
  vine.object({
    code: vine.string().trim().minLength(2).maxLength(2).optional(),
    name: vine.string().trim().minLength(1).maxLength(32).optional(),
  }),
);
