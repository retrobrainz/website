import vine from '@vinejs/vine';

export const franchiseMergeValidator = vine.compile(
  vine.object({
    targetFranchiseId: vine.number(),
  }),
);
