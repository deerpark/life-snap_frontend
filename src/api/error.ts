import { ErrorObject } from "@interface"

export const errorObjects: { [key: string]: ErrorObject } = {
  NOT_FOUND_AUTHORIZED: {
    code: "4001",
    type: "NOT_FOUND_AUTHORIZED",
    message: "인증 정보가 만료됬거나, 올바르지 않습니다.",
  },
}

export class CustomError extends Error {
  error: ErrorObject = {
    code: "",
    type: "CUSTOM_ERROR",
    message: "",
  }

  constructor(message: string) {
    super(message)
    this.error.message = message
  }
}
