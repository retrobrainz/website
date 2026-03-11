import vine from '@vinejs/vine';

export const franchiseValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    wikipedia: vine.string().trim().url().optional().nullable(),
    iconId: vine
      .number()
      .withoutDecimals()
      .exists({ table: 'images', column: 'id' })
      .optional()
      .nullable(),
  }),
);
