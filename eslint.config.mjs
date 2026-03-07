import { react } from 'eslint-config-ali';
import prettier from 'eslint-plugin-prettier/recommended';

export default [...react, prettier, { ignores: ['database/schema.ts', '.adonisjs'] }];
