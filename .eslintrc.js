module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
  },
  rules: {
    'no-console': 0,
    'node/no-unpublished-require': 0,
    'no-shadow': 'warn',
    'block-scoped-var': 'error',
    'consistent-return': 'error',
    eqeqeq: 'error',
  },
};
