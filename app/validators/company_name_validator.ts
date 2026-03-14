import vine from '@vinejs/vine';

const startDateRule = vine
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .nullable();

const endDateRule = vine
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .nullable();

export const companyNameStoreValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(256),
    abbr: vine.string().trim().maxLength(64).optional().nullable(),
    startDate: startDateRule,
    endDate: endDateRule,
  }),
);

export const companyNameUpdateValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(256).optional(),
    abbr: vine.string().trim().maxLength(64).optional().nullable(),
    startDate: startDateRule,
    endDate: endDateRule,
  }),
);
