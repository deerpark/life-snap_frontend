import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  client: {
    VITE_API_TOKEN: z.string(),
    VITE_USE_PROXY: z.string(),
    VITE_API_BASE_URL: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    VITE_API_TOKEN: process.env.VITE_API_TOKEN,
    VITE_USE_PROXY: process.env.VITE_USE_PROXY,
    VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
  },
  clientPrefix: "VITE_",
})
