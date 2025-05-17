// eslint.config.mjs
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import("eslint").FlatConfig[]} */
export default [
  // JS base config
  js.configs.recommended,

  // Top-level ignores (MUST be a separate object)
  {
    ignores: [
      'node_modules',
      'coverage',
      'dist',
      'build',
      '.DS_Store',
      '*.pem',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.env',
      '.env.development',
      '.env.production',
      '.env.staging',
      '.env.template',
      '.env.*',
      '*.tsbuildinfo',
      'generated',
      '/generated'
    ]
  },

  // TypeScript configuration
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules
    }
  },

  // Shared JS + TS rules
  {
    files: ['**/*.js', '**/*.ts'],
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          endOfLine: 'auto'
        }
      ],
      'no-console': 'off',
      'no-alert': 'off',
      'no-unused-vars': 'off',
      camelcase: 'off',
      'no-param-reassign': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
      // '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
];
