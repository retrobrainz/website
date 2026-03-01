import env from '#start/env';
import { defineConfig, drivers } from '@adonisjs/core/encryption';

export default defineConfig({
  /**
   * The default driver used by encryption.encrypt() and
   * encryption.decrypt() when no driver is explicitly specified.
   */
  default: 'chacha',

  list: {
    chacha: drivers.chacha20({
      id: 'chacha',
      keys: [env.get('APP_KEY')],
    }),
  },
});
