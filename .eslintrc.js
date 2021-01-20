module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "react-app",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    files: ['*.ts', '*.tsx'],
    ecmaVersion: 2018,
    sourceType: "module", // Allows for use of imports
    ecmaFeatures: {
      jsx: true,
    },
    project: "tsconfig.json"
  },
  settings: {
    react: {
      version: "detect",
    }
  },
  rules: {
    "no-console": "warn",
    "prettier/prettier": "warn",
    "react/self-closing-comp": ["warn", {
      "component": true,
      "html": true,
    }],
    "quotes": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/quotes": ["warn", "backtick"],
    "react/prop-types": "warn",
    "react/display-name": "warn",
    "@typescript-eslint/naming-convention": ["error", {
      "selector": "variableLike",
      "leadingUnderscore": "allowSingleOrDouble",
      "format": ["camelCase", "UPPER_CASE", "PascalCase"]
    }],
    "@typescript-eslint/no-use-before-define": "off", // Doesn't make much sense for types 
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",

  }
}