// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json")
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json")
  },
  plugins: ["@typescript-eslint", "simple-import-sort", "react-hooks"],
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Packages. `react` and 'next'
          ["^react", "^next"],
          // Related packages
          ["^@?\\w"],
          // Internal packages
          ["^(app|common|core|components|ducks|mock|utils|testUtils)(/.*|$)"],
          // Side effect imports.
          ["^\\u0000"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$", "^.+\\.s?css$"]
        ]
      }
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports"
      }
    ],
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "error",
    "no-underscore-dangle": ["error", { allow: [""] }]
  }
};

module.exports = config;

