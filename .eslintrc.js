module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier',
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'always'],
    'vue/max-attributes-per-line': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'prettier/prettier': [
      'error',
      { singleQuote: true,
        trailingComma: 'es5',
        semi: true,
      },
    ],
  },
};
