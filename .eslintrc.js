module.exports = {
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["react-hooks", "check-file"],
  rules: {
    quotes: ["error", "double"],
    "linebreak-style": ["error", "windows"],
    camelcase: ["error", { properties: "always" }],
    "check-file/filename-naming-convention": [
      "error",
      {
        "*/.{js,ts}": "CAMEL_CASE",
        "*.{jsx,tsx}": "PASCAL_CASE",
      },
    ],
    "check-file/folder-naming-convention": [
      "error",
      {
        "src/**/": "CAMEL_CASE",
        "mocks/*/": "KEBAB_CASE",
      },
    ],
  },
};
