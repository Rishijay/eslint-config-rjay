module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/jsx-runtime",
    "airbnb",
    "./Rules/comments-above",
    "./Rules/file-naming",
    "./Rules/function-comments",
    "./Rules/variable-naming",
  ],
  overrides: [
    {
      files: ["*.jsx", "*.js", "*.tsx", "*.ts"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  ignorePatterns: ["index.js", "*.test.js", "index.*.js", "dist/*", "public/*"],
  Rules: {
    "file-naming": "error",
    "comments-above": "error",
    quotes: 0,
    "linebreak-style": 0,
    "react/react-in-jsx-scope": 0,
    "object-curly-newline": 0,
    "comma-dangle": 0,
    "arrow-parens": 0,
    "no-param-reassign": 0,
    "react/jsx-props-no-spreading": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/function-component-definition": [
      2,
      {
        namedComponents: ["arrow-function", "function-declaration"],
        unnamedComponents: "arrow-function",
      },
    ],
    "variable-naming": ["error", { exceptionFile: ".variableignore" }],
  },
};
