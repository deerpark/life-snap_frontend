import { Snap, SnapFilterOptions } from "@interface"
import { AxiosResponse } from "axios"

import { GRADE, IS_ADMIN, USER_ROLE } from "@lib/enum"

export type ResponseCode = "200" | "400" | "500"

export type ResponseStatus = "SUCCESS" | "ERROR"
export type ResponseMessage = "성공" | "비즈니스 로직 에러"

export interface SuccessResponse<T = object> extends AxiosResponse {
  code?: ResponseCode
  message: ResponseMessage
  /* status: ResponseStatus */
  data: T
}

/**
 * Error
 */
export interface ErrorObject {
  code: string
  type: string
  message: string
}

export interface ErrorResponse {
  status: string
  message: string
}

/**
 * 사용자 정보
 */
export type GetUserInfoType = {
  user_email?: string
  user_id: string
  user_nm: string
  team_nm?: string
  role?: USER_ROLE
  isAdmin?: IS_ADMIN
}

/**
 * 인가
 */
export type JwtPayload = GetUserInfoType & {
  iat: number
  exp: number
  scopes?: USER_ROLE[]
}

export interface SuccessResponse<T = object> extends AxiosResponse {
  data: T
  /* message: "성공" | "실패";
  status: "SUCCESS" | "ERROR"; */
}

export interface GetSnapsParams {
  /** 필터링 텍스트 */
  text?: string
  /** 시작 날짜 */
  start_date?: string
  /** 끝 날짜 */
  end_date?: string
  /** 나이 */
  age?: string
  /** 등급 */
  grade?: GRADE
  /** 직업 */
  job?: string
  /** 랜덤 시드 */
  seed?: number | string | null
  /** 페이지 */
  page?: number
  /** 페이지 사이즈 */
  page_size?: number
}

export type SnapsSuccessData = {
  seed: number | string | null
  snaps: Snap[]
  hasMore: boolean
}
export type SnapFilterOptionsSuccessData = SnapFilterOptions
export interface RootResponse {
  data: {
    user: JwtPayload | null
  }
}
export interface SnapsResponse {
  data: SnapsSuccessData
}
