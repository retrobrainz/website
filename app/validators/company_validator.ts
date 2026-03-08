import vine from '@vinejs/vine';

export const companyValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    parentId: vine
      .number()
      .withoutDecimals()
      .exists({ table: 'companies', column: 'id' })
      .optional()
      .nullable(),
  }),
);
