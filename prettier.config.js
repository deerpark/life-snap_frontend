/** @type {import('prettier').Config} */
const config = {
  endOfLine: "lf",
  semi: false,
  useTabs: false,
  singleQuote: false,
  quoteProps: "consistent",
  tabWidth: 2,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: "always",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@interface$",
    "^types$",
    "^@types/(.*)$",
    "^@type/(.*)$",
    "",
    "^@src/(.*)$",
    "^@env$",
    "^@remote$",
    "^@api/(.*)$",
    "^@store$",
    "^@stores/(.*)$",
    "^@hook",
    "^@hooks/(.*)$",
    "^@lib/(.*)$",
    "^@components/ui/(.*)$",
    "^@components/(.*)$",
    "^@mock/(.*)$",
    "^@styles/(.*)$",
    "",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}

export default config
