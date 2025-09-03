import boundaries from "eslint-plugin-boundaries";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').FlatConfig[]} */
export default [
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: { boundaries },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: ["shared"], allow: ["shared"] },
            { from: ["entities"], allow: ["shared", "entities"] },
            { from: ["features"], allow: ["shared", "entities", "features"] },
            {
              from: ["widgets"],
              allow: ["shared", "entities", "features", "widgets"],
            },
            { from: ["pages"], allow: ["*"] },
            { from: ["routes"], allow: ["*"] },
            { from: ["app"], allow: ["*"] },
          ],
        },
      ],
    },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "pages", pattern: "src/pages/**" },
        { type: "routes", pattern: "src/routes/**" },
        { type: "widgets", pattern: "src/widgets/**" },
        { type: "features", pattern: "src/features/**" },
        { type: "entities", pattern: "src/entities/**" },
        { type: "shared", pattern: "src/shared/**" },
      ],
    },
  },
];
