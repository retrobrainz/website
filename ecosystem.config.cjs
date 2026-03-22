module.exports = {
  apps: [
    {
      name: 'retrobrainz',
      script: './build/bin/server.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      env: {
        ENV_PATH: __dirname,
      },
    },
  ],
};
