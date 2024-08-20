/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  ignorePatterns: ["node_modules/*"],

  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: {},
    },
    react: {
      // 현재 React 버전을 명시합니다.
      // 명시하지 않을 경우(기본값 'detect') React 라이브러리 전체를 불러오므로
      // 린트 과정에서 속도가 느려질 수 있습니다.
      version: "detect",
    },
  },

  // https://www.npmjs.com/package/eslint-plugin-react
  // https://www.npmjs.com/package/eslint-plugin-jsx-a11y
  // https://www.npmjs.com/package/eslint-plugin-import
  // https://www.npmjs.com/package/eslint-plugin-prettier
  plugins: ["@typescript-eslint", "react", "jsx-a11y", "import", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],

  rules: {
    // 미사용 변수 (나머지 매개변수는 예외)
    "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],

    // Prettier 규칙 위반 시 경고
    "prettier/prettier": "warn",

    // 암시적 타입 변환을 금지
    "no-implicit-coercion": "error",
    // 모든 제어문 중괄호
    curly: ["error", "all"],
    // 동등 비교(===, !==)를 사용. null 제외
    eqeqeq: ["error", "always", { null: "ignore" }],

    // 네이밍 컨벤션
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

    "import/order": [
      "error",
      {
        // 항상 새 줄
        "newlines-between": "always",
        // import를 알파벳 오름차순으로 정렬
        // 정렬 시 대소문자 구분 안 함
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],

        pathGroups: [
          // react/nextjs 처리
          {
            pattern: "{next,next/**,react,react-dom}",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "next"],
      },
    ],

    // React 17 이상을 위한 설정
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    // React.memo, React.forwardRef 사용 시 발생하는 경고 무시
    "react/display-name": "off",
    // DOM에 정의되지 않은 속성을 사용했는지 체크
    "react/no-unknown-property": "error",
    // <img> 태그의 alt 속성 체크
    "jsx-a11y/alt-text": [
      "warn",
      {
        elements: ["img"],
      },
    ],
    // 유효한 aria-* 속성만 사용
    "jsx-a11y/aria-props": "warn",
    // 유효한 aria-* 상태/값만 사용
    "jsx-a11y/aria-proptypes": "warn",
    // DOM에서 지원되는 role, ARIA만 사용
    "jsx-a11y/aria-unsupported-elements": "warn",
    // 필수 ARIA 속성이 빠져있는지 체크
    "jsx-a11y/role-has-required-aria-props": "warn",
    // ARIA 속성은 지원되는 role에서만 사용
    "jsx-a11y/role-supports-aria-props": "warn",
  },
};
