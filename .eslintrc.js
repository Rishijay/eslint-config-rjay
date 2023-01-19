module.exports = {
  extends: [
    "airbnb",
    "plugin:react/recommended",
  ],
  plugins: ['check-file'],
  rules: {
    "linebreak-style": 0,
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
      },
    ],
  },
};
