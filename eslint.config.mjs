import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import babelParser from "@babel/eslint-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  js.configs.recommended,

  ...compat.config({
    plugins: ["react", "react-native"],
    settings: { react: { version: "detect" } },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:jest/recommended"],
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: false,
    },
    env: { "react-native/react-native": true },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  }),

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: "latest",
        sourceType: "module",
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
    },
  },
];
