// ESM 문법
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@app": path.resolve(__dirname, "./src/app"),
    },
  },
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    host: true, // host에서 접근 가능
    port: 5173,
    strictPort: true,
  },
});
