import vine from '@vinejs/vine';

const foundingDateRule = vine
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .nullable();

const defunctDateRule = vine
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .nullable();

export const companyValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    abbr: vine.string().trim().maxLength(64).optional().nullable(),
    wikipedia: vine.string().trim().maxLength(2048).optional().nullable(),
    foundingDate: foundingDateRule,
    defunctDate: defunctDateRule,
    parentId: vine
      .number()
      .withoutDecimals()
      .exists({ table: 'companies', column: 'id' })
      .optional()
      .nullable(),
  }),
);
