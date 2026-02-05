import vine from '@vinejs/vine';

export const companyValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
  }),
);
