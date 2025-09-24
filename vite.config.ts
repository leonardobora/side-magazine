import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared", "types.ts"), // Use frontend-safe types only
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Security: Ensure no backend code is included in the frontend build
    rollupOptions: {
      external: [
        // Explicitly exclude all server-side modules
        'express',
        'drizzle-orm',
        'drizzle-kit',
        '@neondatabase/serverless',
        'tsx',
        'esbuild',
        // Exclude server files by pattern
        /^node:.*/,
        /^server\/.*/,
      ],
    },
  },
  server: {
    fs: {
      strict: true,
      // Deny access to sensitive files and directories
      deny: [
        "**/.*",           // Hidden files (like .env) 
        "**/server/**",    // Server directory
        "**/node_modules/**", // Node modules
        "**/*.env*",       // Environment files
        "**/dist/**",      // Build output
        "**/migrations/**", // Database migrations
        "**/drizzle.config.*", // Database config
      ],
    },
  },
});
