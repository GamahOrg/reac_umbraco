import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [cssInjectedByJsPlugin(), react()],
  build: {
    manifest: "manifest.json",
    minify: true,
    terserOptions: {
      compress: true,
      mangle: true,
    },
    // merge all libraries into one file
    rollupOptions: {
      output: {
        manualChunks: {
          mapbox: ["mapbox-gl"],
          react: ["react"],
          reactdom: ["react-dom"],
          filepond: ["filepond"],
          axios: ["axios"],
          reactmapgl: ["react-map-gl"],
          react_router_dom: ["react-router-dom"],
        },
        dir: "../wwwroot/inspection-form", // Output to the wwwroot folder of the Umbraco project
      },
    },
  },
});
