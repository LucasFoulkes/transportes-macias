import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "PWA",
        short_name: "PWA",
        icons: [
          {
            src: "/logo.png",
            sizes: "any",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
