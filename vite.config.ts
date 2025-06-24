import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    vitePrerenderPlugin({
      // /** 정적으로 뽑을 라우트 */
      additionalPrerenderRoutes: ['/', '/pdf', '/graph'],

      /** 라우트 HTML 안에 삽입될 대상 노드 (#root) */
      renderTarget: '#root',

      /** 프리렌더 함수가 들어 있는 파일 (절대경로) */
      prerenderScript: '/prerender.tsx',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "assets"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
