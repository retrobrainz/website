import { defineConfig } from '@adonisjs/static';

/**
 * Configuration options to tweak the static files middleware.
 * The complete set of options are documented on the
 * official documentation website.
 *
 * https://docs.adonisjs.com/guides/basics/static-file-server
 */
const staticServerConfig = defineConfig({
  enabled: true,
  etag: true,
  lastModified: true,
  dotFiles: 'ignore',
  cacheControl: true,
  maxAge: '1 year',
  immutable: true,
});

export default staticServerConfig;
