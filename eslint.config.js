const typescript = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const importSort = require("eslint-plugin-simple-import-sort");
const react = require("eslint-plugin-react");
const prettier = require("eslint-config-prettier");
const globals = require("globals");
const eslint = require("@eslint/js");

module.exports = [
    {
        ignores: [
            "**/dist",
            "**/coverage",
            "**/public",
            "**/.netlify",
            "**/.idea",
            "**/.github",
            "**/.cache",
            "src/gatsby-types.d.ts",
            "eslint.config.js",
        ],
    },
    eslint.configs.recommended,
    {
        settings: {
            react: {
                version: "detect",
            },
        },
        linterOptions: {
            noInlineConfig: true,
            reportUnusedDisableDirectives: true,
        },
        languageOptions: {
            parser: tsParser,
            sourceType: "module",
            ecmaVersion: "latest",
            parserOptions: {
                project: "tsconfig.json",
                tsconfigRootDir: "./",
                noWatch: true,
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.es5,
                ...globals.node,
                ...globals.mocha,
                React: false,
                Queries: false,
            },
        },
        files: ["src/**/*.{ts,tsx}", "scripts/*.ts", "gatsby-*.{ts,tsx}", "test/**/*.spec.{js,ts}"],
        plugins: {
            "@typescript-eslint": typescript,
            "simple-import-sort": importSort,
            prettier,
            react,
        },
        rules: {
            ...prettier.rules,
            ...typescript.configs.recommended.rules,
            ...react.configs.recommended.rules,
            indent: 0,
            "linebreak-style": ["error", "unix"],
            quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
            semi: ["error", "always"],
            "@typescript-eslint/camelcase": 0,
            "@typescript-eslint/no-var-requires": 0,
            "@typescript-eslint/explicit-function-return-type": 0,
            "@typescript-eslint/no-explicit-any": 0,
            "@typescript-eslint/no-non-null-assertion": 0,
            "react/prop-types": 0,
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
    },
];
