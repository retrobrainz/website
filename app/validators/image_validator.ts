import vine from '@vinejs/vine';

export const imageStoreValidator = vine.create(
  vine.object({
    image: vine.file({
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    }),
    width: vine.number().min(1).max(1920).optional(),
    height: vine.number().min(1).max(1080).optional(),
    fit: vine.enum(['cover', 'contain', 'fill', 'inside', 'outside']).optional(),
  }),
);
