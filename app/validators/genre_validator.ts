import vine from '@vinejs/vine';

export const createGenreValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    wikipedia: vine.string().trim().url().optional().nullable(),
  }),
);

export const updateGenreValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    wikipedia: vine.string().trim().url().optional().nullable(),
  }),
);
