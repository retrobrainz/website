import type { HttpContext } from '@adonisjs/core/http';

export default class ProfileController {
  async show({ auth }: HttpContext) {
    const user = auth.user!;
    return user;
  }

  async update({ auth }: HttpContext) {
    const user = auth.user!;
    return user;
  }
}
