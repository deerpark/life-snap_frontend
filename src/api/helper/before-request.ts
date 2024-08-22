import { API } from "@remote"
import axios, { InternalAxiosRequestConfig } from "axios"

import { env } from "@env"
import { routeBackToLogin } from "@lib/utils"

/**
 * api intercepter before request
 */
export const beforeRequest = (config: InternalAxiosRequestConfig) => {
  const token = API.getAccessToken() || env.VITE_API_TOKEN

  if (!token) {
    // 리디렉션 로직 추가
    routeBackToLogin()
    throw new axios.Cancel("No access token available, redirecting to login.")
  }

  return config
}
