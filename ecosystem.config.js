module.exports = {
  apps: [
    {
      name: 'web-app',
      script: './build/bin/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      env: {
        ENV_PATH: __dirname,
      },
    },
  ],
};
