import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "tsconfig.tsbuildinfo",
      "public/**",
      "scripts/**",
      "next-env.d.ts",
      "sanity/schemaTypes/**",
    ],
  },
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
      // Sanity types use `any` in places; allow for now.
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", {argsIgnorePattern: "^_", varsIgnorePattern: "^_"}],
      // Overly strict for the icon-from-static-map pattern (icons.ts). Refs
      // are stable across renders; keep the rule off project-wide.
      "react-hooks/static-components": "off",
    },
  },
]

export default config
