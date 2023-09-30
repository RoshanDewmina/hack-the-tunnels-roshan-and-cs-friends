import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const REPO_NAME = process.env.REPO_NAME || '';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `${REPO_NAME}/`
});
