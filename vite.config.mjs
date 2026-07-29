import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const configuredBasePath = process.env.VITE_BASE_PATH?.trim() || "/";
const basePath = configuredBasePath.endsWith("/") ? configuredBasePath : `${configuredBasePath}/`;

export default defineConfig({
  base: basePath,
  plugins: [react()],
  server: {
    host: true,
    port: 4173
  }
});
