module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'eslint:recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    semi: 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
