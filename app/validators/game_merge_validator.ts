import vine from '@vinejs/vine';

export const gameMergeValidator = vine.compile(
  vine.object({
    targetGameId: vine.number().withoutDecimals().exists({ table: 'games', column: 'id' }),
  }),
);
