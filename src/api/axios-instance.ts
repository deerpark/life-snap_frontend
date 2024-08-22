import { JwtPayload, SuccessResponse } from "@interface"
import { CustomError } from "@remote"
import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { addSeconds } from "date-fns"
import Cookie from "js-cookie"

import { env } from "@env"
import {
  beforeRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "@api/helper"
import { KEY } from "@lib/enum"
import { decodeJwtToken } from "@lib/utils"

/**
 * API factory
 */
export class API {
  /** API instance's jwt payload */
  private jwtPayload: JwtPayload | null = null

  /** remove API instance's `accessToken` alongside its cookie and route back to the login page */
  removeAccessToken = () => {
    Cookie.remove(KEY.ACCESS_TOKEN)
    this.jwtPayload = null
  }

  /** get API instance's `accessToken` */
  getAccessToken = (): boolean => {
    try {
      if (!this.jwtPayload) {
        const accessToken = Cookie.get(KEY.ACCESS_TOKEN)
        if (!accessToken) {
          throw new CustomError("access token is not available")
        }

        const isAccessTokenSet = this.setAccessToken(accessToken)
        if (!isAccessTokenSet) {
          throw new CustomError("unable to set access token")
        }
      }

      // const isJwtTokenExpired = checkJwtTokenExpired(
      //   this.jwtPayload as JwtPayload
      // )
      // if (isJwtTokenExpired) {
      //   throw new CustomError('jwt token has expired')
      // }
      return true
    } catch (error) {
      this.removeAccessToken()
    }

    return false
  }

  /** decode the jwt token and allocate its payload to the API instance as `jwtPayload` */
  setAccessToken = (accessToken: string): boolean => {
    try {
      const jwtPayload = decodeJwtToken(accessToken)
      if (!jwtPayload) {
        throw new CustomError("unidentified access token")
      }

      // const isJwtTokenExpired = checkJwtTokenExpired(jwtPayload)
      // if (isJwtTokenExpired) {
      //   throw new CustomError('jwt token has expired')
      // }

      const expires = addSeconds(new Date(), jwtPayload.exp)
      this.jwtPayload = jwtPayload
      Cookie.set(KEY.ACCESS_TOKEN, accessToken, {
        expires,
      })

      return true
    } catch (error) {
      this.removeAccessToken()
    }

    return false
  }

  get userInfo() {
    return this.jwtPayload
  }

  /** the API instance */
  private static instance: API
  public static getInstance() {
    return API.instance || (API.instance = new this())
  }

  /** the axios instance */
  private axiosInstance: AxiosInstance | undefined

  /** default axios http headers */
  private static defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${Cookie.get(KEY.ACCESS_TOKEN)}`,
  }

  /** default axios request configuration */
  static axiosRequestConfig: AxiosRequestConfig = {
    baseURL: `${env.VITE_API_BASE_URL}/api`,
    timeout: 30000,
    headers: API.defaultHeaders,
  }

  constructor() {
    if (!API.instance) {
      API.instance = this
      this.createAxiosInstance()
    }
  }

  /** create a custom axios instance */
  private createAxiosInstance() {
    this.getAccessToken()

    if (!this.axiosInstance) {
      this.axiosInstance = axios.create(API.axiosRequestConfig)

      this.axiosInstance.interceptors.request.use(beforeRequest, onRequestError)
      this.axiosInstance.interceptors.response.use(onResponse, onResponseError)
    }
  }

  /** HTTP GET */
  public get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<T>> {
    return this.axiosInstance!.get(url, config)
  }

  /** HTTP POST */
  public post<T>(
    url: string,
    data: object,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<T>> {
    return this.axiosInstance!.post(url, data, config)
  }

  /** HTTP PUT */
  public put<T>(
    url: string,
    data: object,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<T>> {
    return this.axiosInstance!.put(url, data, config)
  }

  /** HTTP PATCH */
  public patch<T>(
    url: string,
    data: object,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<T>> {
    return this.axiosInstance!.patch(url, data, config)
  }

  /** HTTP DELETE */
  public delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<T>> {
    return this.axiosInstance!.delete(url, config)
  }
  // public updateHeader() {
  //   API.defaultHeaders.Authorization = `Bearer ${Cookie.get(KEY.ACCESS_TOKEN)}`;
  //   this.axiosInstance = axios.create(API.axiosRequestConfig);
  // }
  /** HTTP CUSTOM REQUEST */
  public request<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    data: object,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<T>> {
    const customConfig: AxiosRequestConfig = {
      url,
      method,
      data,
      ...config,
    }

    return this.axiosInstance!.request(customConfig)
  }
}

export default API.getInstance()
