import vine from '@vinejs/vine';

const releaseDateRule = vine
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .nullable();

const nullableImageIdRule = vine
  .number()
  .withoutDecimals()
  .exists({ table: 'images', column: 'id' })
  .optional()
  .nullable();

const emulatorIdsRule = vine
  .array(vine.number().withoutDecimals().exists({ table: 'emulators', column: 'id' }))
  .optional();

export const createPlatformValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(64),
    abbr: vine.string().trim().maxLength(8).optional().nullable(),
    companyId: vine.number().withoutDecimals().exists({ table: 'companies', column: 'id' }),
    screenWidth: vine.number().withoutDecimals().min(1),
    screenHeight: vine.number().withoutDecimals().min(1),
    releaseDate: releaseDateRule,
    logoId: nullableImageIdRule,
    photoId: nullableImageIdRule,
    emulatorIds: emulatorIdsRule,
  }),
);

export const updatePlatformValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(64).optional(),
    abbr: vine.string().trim().maxLength(8).optional().nullable(),
    companyId: vine
      .number()
      .withoutDecimals()
      .exists({ table: 'companies', column: 'id' })
      .optional(),
    screenWidth: vine.number().withoutDecimals().min(1).optional(),
    screenHeight: vine.number().withoutDecimals().min(1).optional(),
    releaseDate: releaseDateRule,
    logoId: nullableImageIdRule,
    photoId: nullableImageIdRule,
    emulatorIds: emulatorIdsRule,
  }),
);
