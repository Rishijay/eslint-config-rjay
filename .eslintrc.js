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
    "check-file",
    "react",
  ],
  rules: {
    quotes: 0,
    'react/react-in-jsx-scope': 0,
    "check-file/filename-naming-convention": [
      "error",
      {
        "**/*.{jsx,tsx}": "PASCAL_CASE",
        "**/*.{js,ts}": "CAMEL_CASE",
      },
    ],
    "check-file/no-index": "error",
    "check-file/folder-naming-convention": [
      "error",
      {
        "src/**/": "CAMEL_CASE",
      },
    ],
  },
};
