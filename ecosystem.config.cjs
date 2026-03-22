module.exports = {
  apps: [
    {
      name: 'retrobrainz',
      script: './build/bin/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '400M',
      node_args: '--max-old-space-size=450',
      env: {
        ENV_PATH: __dirname,
      },
    },
  ],
};
