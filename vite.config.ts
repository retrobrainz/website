import adonisjs from '@adonisjs/vite/client';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['resources/js/app.tsx'],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
    react(),
  ],
  server: {
    watch: {
      ignored: ['**/storage/**', '**/tmp/**'],
    },
  },
});
