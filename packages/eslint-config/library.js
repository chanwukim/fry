const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
    react: {
      version: "detect",
    },
  },
  globals: {
    React: true, // React를 import 없이 사용 가능
    JSX: true, // JSX 문법 사용 가능
  },
  env: {
    node: true, // Node.js의 전역 객체와 모듈 사용 가능 (process, require 등)
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "turbo",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    curly: "error", // 모든 제어문 중괄호
    "no-implicit-coercion": "error", // 암시적 타입 변환을 금지
    eqeqeq: ["error", "always", { null: "ignore" }], // 동등 비교(===, !==)를 사용. null 제외
    "require-await": "error", // async 함수는 await 사용 필수
    "import/no-duplicates": ["error", { considerQueryString: true }], // 중복 import 금지

    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/ban-ts-comment": "off", // @ts-<directive> 사용 가능
    "@typescript-eslint/consistent-type-imports": "error", // 타입만 import할 때는 import type을 사용하도록 강제
    "@typescript-eslint/naming-convention": [
      "error",
      {
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        selector: "variable",
        leadingUnderscore: "allow",
      },
      { format: ["camelCase", "PascalCase"], selector: "function" },
      { format: ["PascalCase"], selector: "interface" },
      { format: ["PascalCase"], selector: "typeAlias" },
    ],

    "react/prop-types": "off", // prop-types 사용 금지
    "react/react-in-jsx-scope": "off", // React를 import 하지 않아도 JSX 사용 가능. React 17 이상에서는 불필요
    "react/jsx-uses-react": "off", // React 17 이상에서는 불필요
    "react/display-name": "off", // display name 검사 비활성화 (React.memo, React.forwardRef)
    "react/no-unknown-property": "error",

    "import/order": [
      "error",
      {
        "newlines-between": "always", // 항상 새 줄
        alphabetize: {
          order: "asc", // import를 알파벳 오름차순으로 정렬
          caseInsensitive: true, // 정렬 시 대소문자 구분 안 함
        },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
        pathGroups: [
          {
            pattern: "{next,next/**,react,react-dom}", // framework 처리
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "next"],
      },
    ],
  },
  overrides: [{ files: ["*.ts?(x)"] }],
  ignorePatterns: [".*.js", "node_modules/", "dist/"],
};
