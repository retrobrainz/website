import vine from '@vinejs/vine';

export const profileUpdateValidator = vine.create(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .unique({
        table: 'users',
        column: 'email',
        filter: (query, value, ctx) => {
          // Exclude current user's email from unique check
          query.whereNot('id', ctx.root.user.id);
        },
      })
      .optional(),
    username: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(32)
      .unique({
        table: 'users',
        column: 'username',
        filter: (query, value, ctx) => {
          // Exclude current user's username from unique check
          query.whereNot('id', ctx.root.user.id);
        },
      })
      .optional(),
    avatarId: vine.number().exists({ table: 'images', column: 'id' }).optional(),
  }),
);
