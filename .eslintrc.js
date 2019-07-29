module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ["error", "always"],
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],
    "space-infix-ops": ["error", {"int32Hint": true}],
    eqeqeq: ["error", "always"],
    "indent": ["error", 2],
    "no-trailing-spaces": "error",
    "no-var": "error"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
