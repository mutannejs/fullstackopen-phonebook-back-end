import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    ignores: ["build/**/*"],
    rules: {
      indent: ['warn', 2],
      semi: ['warn', 'always'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'warn',
      'object-curly-spacing': ['warn', 'always'],
      'arrow-spacing': ['warn', { 'before': true, 'after': true }],
      'no-console': 0,
    }
  },
]);
