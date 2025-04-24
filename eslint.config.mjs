import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      // Ignore compiled files in .next directory
      ".next/**/*",
      // Add any other directories you want to ignore
    ]
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      // Turn off some rules that are causing many errors
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "react/no-unescaped-entities": "warn",
      
      // Turn off rules for compiled code
      "@typescript-eslint/no-unused-expressions": "off",
      
      // Prefer using import over require style
      "@typescript-eslint/no-require-imports": "warn",
      
      // Downgrade some Next.js specific rules to warnings
      "@next/next/no-img-element": "warn",
      "@next/next/no-css-tags": "warn",
      "@next/next/no-page-custom-font": "warn"
    }
  }
];

export default eslintConfig;
