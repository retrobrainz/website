import vine from '@vinejs/vine';

export const profileUpdateValidator = vine.create(
  vine.object({
    avatarId: vine.number().exists({ table: 'images', column: 'id' }).optional(),
  }),
);
