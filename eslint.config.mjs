import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const flatCompact = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  ...flatCompact.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
