import { AxiosRequestConfig } from "axios"
import { merge } from "lodash"

import { getCustomHeader } from "@api/helper"

/**
 * api intercepter on request error
 */
export const onRequestError = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  return merge(config, {
    header: merge(config.headers, getCustomHeader()),
  })
}
