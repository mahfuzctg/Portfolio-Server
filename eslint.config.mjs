import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import globals from "globals";

/** @type {import('eslint').Linter.Config} */
export default {
  files: ["**/*.{js,mjs,cjs,ts}"],

  languageOptions: {
    parser: parser,
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.node,
      ...globals.browser, // Merge both Node.js and browser globals if needed
    },
  },

  plugins: {
    "@typescript-eslint": ts,
  },

  rules: {
    ...js.configs.recommended.rules,
    ...ts.configs.recommended.rules,
  },
};
