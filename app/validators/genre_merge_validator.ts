import vine from '@vinejs/vine';

export const genreMergeValidator = vine.compile(
  vine.object({
    targetGenreId: vine.number(),
  }),
);
