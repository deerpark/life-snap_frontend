import { JwtPayload } from "@interface"
import { jwtDecode } from "jwt-decode"

/**
 * decode jwt token string and return its payload
 */
export const decodeJwtToken = (jwtToken: string): JwtPayload | null => {
  const decodedJwtObject = jwtDecode(jwtToken)
  if (decodedJwtObject) {
    return decodedJwtObject as JwtPayload
  }
  return null
}
