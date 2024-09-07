import { defineConfig } from "tsup";

/**
 * @see https://www.jsdocs.io/package/tsup#Options
 */
export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./src/*.(ts|tsx)", "!src/**/*.spec.ts", "!src/**/*.test.ts"],
  sourcemap: true,
  dts: true,
  clean: true,
  minify: true,
  treeshake: true,
});
