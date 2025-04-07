import js from '@eslint/js';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import path from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';
import { errorRules } from './configs/eslint/error.config.js';
import { importRules } from './configs/eslint/import.config.js';
import { reactRules } from './configs/eslint/react.config.js';
import { tsRules } from './configs/eslint/ts.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
  ],
  files: ['src/**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'unused-imports': unusedImports,
    react: react,
    import: importPlugin,
  },
  settings: {
    'import/parsers': {
      espree: ['.ts', 'tsx'],
    },
    'import/resolver-next': [
      createTypeScriptImportResolver({
        alwaysTryTypes: true,
      }),
    ],
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...tsRules,
    ...importRules,
    ...errorRules,
    ...reactRules,
  },
});
