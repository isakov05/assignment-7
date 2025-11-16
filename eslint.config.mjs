// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Base recommended ESLint rules
  eslint.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // JavaScript config files (Node environment)
  {
    files: ["*.js", "**/*.js"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly"
      }
    }
  }
];
