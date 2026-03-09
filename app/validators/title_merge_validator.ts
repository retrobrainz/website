import vine from '@vinejs/vine';

export const titleMergeValidator = vine.compile(
  vine.object({
    targetTitleId: vine.number().withoutDecimals().exists({ table: 'titles', column: 'id' }),
  }),
);
