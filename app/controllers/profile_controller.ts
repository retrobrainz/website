import { profileUpdateValidator } from '#validators/profile_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class ProfileController {
  async show({ auth }: HttpContext) {
    const user = auth.user!;
    await user.load('avatar');
    return user;
  }

  async update({ auth, request }: HttpContext) {
    const user = auth.user!;
    const { avatarId } = await request.validateUsing(profileUpdateValidator);
    if (avatarId !== undefined) {
      user.avatarId = avatarId;
    }
    await user.save();
    await user.load('avatar');
    return user;
  }
}
