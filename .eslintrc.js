
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // "eslint-disable import/extensions",
    // "eslint-disable jsx-a11y/no-static-element-interactions",
    // "eslint-disable jsx-a11y/click-events-have-key-events",
    // "eslint-disable jsx-a11y/mouse-events-have-key-events",
    // "eslint-disable max-len",
    // "eslint-disable jsx-a11y/anchor-is-valid"
  },
};
