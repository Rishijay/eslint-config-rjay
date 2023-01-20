module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/jsx-runtime',
    'airbnb',
  ],
  overrides: [
    {
      files: ["*.jsx", "*.js", "*.tsx", "*.ts"],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    "react",
  ],
  rules: {
    quotes: 0,
    'react/react-in-jsx-scope': 0,
  },
};
