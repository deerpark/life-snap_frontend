import { AxiosResponse } from "axios"

/**
 * api intercepter on reseponse
 */
export const onResponse = (response: AxiosResponse): Promise<AxiosResponse> => {
  const { status, data } = response

  if (status !== 200) {
    return Promise.reject(response)
  }

  return data
}
