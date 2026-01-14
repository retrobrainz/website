import vine from '@vinejs/vine';

export const registerValidator = vine.create(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(32).unique({
      table: 'users',
      column: 'username',
    }),
    email: vine.string().trim().email().unique({
      table: 'users',
      column: 'email',
    }),
    password: vine.string().trim().minLength(12).maxLength(32),
  }),
);

export const loginValidator = vine.create(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim(),
  }),
);
