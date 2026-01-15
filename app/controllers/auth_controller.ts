import User from '#models/user';
import { loginValidator, registerValidator } from '#validators/auth_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class AuthController {
  async register({ request }: HttpContext) {
    const { username, email, password } = await request.validateUsing(registerValidator);
    const user = await User.create({ username, email, password });
    const token = await User.accessTokens.create(user);
    return { user, token };
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator);
    const user = await User.verifyCredentials(email, password);
    const token = await User.accessTokens.create(user);
    await user.load('avatar');
    return { user, token };
  }

  async logout({ auth }: HttpContext) {
    await auth.use('api').invalidateToken();
  }
}
