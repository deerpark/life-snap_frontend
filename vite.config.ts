import react from "@vitejs/plugin-react"
import dotenv from "dotenv"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import { httpProxyMiddleware } from "./vite-middleware"

/* import { ViteFaviconsPlugin } from "vite-plugin-favicon"; */

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const useProxy = process.env.VITE_USE_PROXY === "true"

  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      /* ViteFaviconsPlugin("./public/favicon.svg"), */
    ],
    build: {
      outDir: "build", // 출력 폴더를 'build'로 설정
    },
    test: {
      globals: true,
      environment: "jsdom", // 브라우저 환경에서 테스트
      setupFiles: "./setupTests.ts", // 초기화 파일
    },
    define: {
      "process.env": env,
    },
    server: {
      port: 3000,
      ...(useProxy
        ? {
            proxy: {
              "/api": {
                target: env.VITE_API_BASE_URL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, "/api"),
                configure: httpProxyMiddleware,
              },
            },
          }
        : {}),
    },
  }
})
