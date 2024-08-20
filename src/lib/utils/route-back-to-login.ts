/**
 * route back to the login page
 */

import { env } from "src/env"

export const routeBackToLogin = () => {
  window.location.replace(`${env.VITE_API_BASE_URL}/api/login`)
}
