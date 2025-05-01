import globals from "globals"
import js from "@eslint/js"

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  js.configs.recommended
]