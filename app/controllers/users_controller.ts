import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http';

export default class UsersController {
  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id);
    await user.load('avatar');
    return user;
  }
}
