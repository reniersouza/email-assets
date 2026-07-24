// Objetivo: configuração do ESLint. Responsabilidade: validar JavaScript moderno em browser e service worker. Dependências: @eslint/js e globals.
import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['assets/js/**/*.js', 'assets/components/**/*.js', 'service-worker.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
];
