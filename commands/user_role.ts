import User from '#models/user';
import { args, BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
import chalk from 'chalk';

export default class UserRole extends BaseCommand {
  static commandName = 'user:role';
  static description = 'change user role';

  static options: CommandOptions = {
    startApp: true,
  };

  @args.string({ description: 'username' })
  declare username: string;

  @args.string({ description: 'user role' })
  declare role: string;

  async run() {
    const user = await User.findByOrFail('username', this.username);
    if (user.role !== this.role) {
      const oldRole = user.role;
      user.role = this.role;
      await user.save();
      this.logger.info(
        `changed role of user ${chalk.cyan(this.username)} from ${chalk.strikethrough(chalk.red(oldRole))} to ${chalk.green(this.role)}`,
      );
    } else {
      this.logger.info(
        `user ${chalk.cyan(this.username)} already has role ${chalk.green(this.role)}`,
      );
    }
  }
}
