import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

/**
 * Role middleware is used to restrict access to routes based on user roles.
 */
export default class RoleMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      roles: string[];
    },
  ) {
    if (!ctx.auth.user?.role || !options.roles.includes(ctx.auth.user?.role)) {
      return ctx.response.unauthorized();
    }
    return next();
  }
}
