import axios, { InternalAxiosRequestConfig } from "axios"

import axiosInstance from "@api/axios-instance"

/**
 * api intercepter before request
 */
export const beforeRequest = (config: InternalAxiosRequestConfig) => {
  const token = axiosInstance.getAccessToken()

  if (!token) {
    // 리디렉션 로직 추가
    window.location.href = "/login" // 리디렉션할 URL
    throw new axios.Cancel("No access token available, redirecting to login.")
  }

  return config
}
