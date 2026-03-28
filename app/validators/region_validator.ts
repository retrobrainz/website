import vine from '@vinejs/vine';

export const createRegionValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(32).unique({
      table: 'regions',
      column: 'name',
    }),
  }),
);

export const updateRegionValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(32).optional(),
  }),
);
