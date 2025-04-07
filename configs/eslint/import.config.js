export const importRules = {
  'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    },
  ],
  'import/no-cycle': 'error',
  'import/newline-after-import': 'error',
  'import/extensions': ['error', 'ignorePackages'],
  'no-restricted-imports': [
    'error',
    {
      patterns: ['./*', '../*', '!*.css', '!*.scss'],
    },
  ],
};
