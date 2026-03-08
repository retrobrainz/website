import vine from '@vinejs/vine';

export const companyMergeValidator = vine.create(
  vine.object({
    targetCompanyId: vine.number().withoutDecimals().exists({ table: 'companies', column: 'id' }),
  }),
);
