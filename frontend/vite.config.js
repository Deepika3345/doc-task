import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: 'https://doc-task.onrender.com',
        // target: window.location.origin,
        changeOrigin: true,
      },
    },
  },
});
