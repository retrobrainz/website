import vine from '@vinejs/vine';

export const imageStoreValidator = vine.create(
  vine.object({
    image: vine.nativeFile(),
    width: vine.number().min(1).max(1920).optional(),
    height: vine.number().min(1).max(1080).optional(),
    fit: vine.enum(['cover', 'contain', 'fill', 'inside', 'outside']).optional(),
    format: vine.enum(['jpeg', 'png', 'webp']).optional(),
  }),
);
