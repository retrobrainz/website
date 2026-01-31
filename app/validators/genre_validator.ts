import vine from '@vinejs/vine';

export const createGenreValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    parentId: vine.number().optional().nullable(),
    duplicateId: vine.number().optional().nullable(),
  }),
);

export const updateGenreValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    parentId: vine.number().optional().nullable(),
    duplicateId: vine.number().optional().nullable(),
  }),
);
