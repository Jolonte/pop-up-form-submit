import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true,
  },
  preview: {
    open: true,
  },
  build: {
    lib: {
      entry: "main.js",
      formats: ["es"],
    },
  },
});
