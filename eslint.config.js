import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Possible Problems
      "no-unused-vars": "warn", // Variables declared but not used

      // Suggestions
      curly: ["warn", "multi-line"], // Require curly braces for all control statements except inlining
      eqeqeq: "warn", // Require the use of === and !==
      "no-trailing-spaces": "warn", // Disallow trailing whitespace at the end of lines
      "no-multiple-empty-lines": ["warn", { max: 1 }], // Disallow multiple empty lines
      "prefer-const": "warn", // Require const declarations for variables that are never reassigned

      // Layout & Formatting (Often handled by Prettier, but can be here too)
      semi: ["warn", "always"], // Require semicolons
    },
  },
]);
