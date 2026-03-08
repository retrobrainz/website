import vine from '@vinejs/vine';

export const companyValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    wikipedia: vine.string().trim().maxLength(2048).optional().nullable(),
    parentId: vine
      .number()
      .withoutDecimals()
      .exists({ table: 'companies', column: 'id' })
      .optional()
      .nullable(),
  }),
);
