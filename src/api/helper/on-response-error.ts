import { ErrorResponse } from "@interface"
import { AxiosResponse } from "axios"
import { get } from "lodash"
import { toast } from "sonner"

import { ERROR_CODE, ERROR_MESSAGE, PAGENAMES } from "@lib/enum"
import { routeBackToLogin } from "@lib/utils"

/**
 * api intercepter on response error
 */
export const onResponseError = (error: {
  response: AxiosResponse
  request: unknown
}) => {
  if (error.response) {
    if (error.response.status === 401) {
      return routeBackToLogin()
    } else if (error.response.status === 404) {
      return (window.location.href = PAGENAMES.NOT_FOUND)
    } else if (error.response.status === 403) {
      toast.error(error.response.statusText)
    } else if (error.response.status === 500) {
      toast.error(ERROR_MESSAGE.SERVER)
    }
  } else if (error.request) {
    // 네트워크 오류 또는 서버 응답 없음
    toast.error(ERROR_MESSAGE.NETWORK)
  } else {
    // 요청 설정 중 에러
    toast.error(ERROR_MESSAGE.UNKNOWN)
  }
  const data: ErrorResponse = get(error, "response.data")
  if (data) {
    const { status, message } = data

    switch (status) {
      case ERROR_CODE.NOT_FOUND_USER:
      case ERROR_CODE.NOT_FOUND_AUTHORIZED:
      case ERROR_CODE.USER_NOT_FOUND_AUTHORIZED:
        routeBackToLogin()
        break
      case ERROR_CODE.BUSINESS_ERROR:
        toast.error(message)
        break
      default:
        toast.error(message)
        break
    }
    return Promise.reject(data)
  }

  return Promise.reject(error)
}
