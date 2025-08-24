import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [cssInjectedByJsPlugin(), react()],
  build: {
    manifest: "manifest.json",
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
    },
    // merge all libraries into one file
    rollupOptions: {
      output: {
        dir: "../wwwroot/inspection-form", // Output to the wwwroot folder of the Umbraco project
      },
    },
  },
});
