/// <reference types="vitest" />
/// <reference types="vite/types/importMeta.d.ts" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
