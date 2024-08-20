/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import Cookies from "js-cookie"
import { useLocation, useNavigate } from "react-router-dom"

import { KEY, PAGENAMES } from "@lib/enum"
import { routeBackToLogin } from "@lib/utils/route-back-to-login"
import { Spinner } from "@components/shared/spinner"

export default function Authentication({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()
  const location = useLocation()
  const userJWT = Cookies.get(KEY.ACCESS_TOKEN)

  React.useLayoutEffect(() => {
    if (userJWT) {
      if (location.pathname === PAGENAMES.LOGIN || location.pathname === "/") {
        navigate(PAGENAMES.HOME, { replace: true })
      }
    } else {
      routeBackToLogin()
    }
  }, [userJWT, location.pathname])

  return userJWT ? <>{children}</> : <Spinner />
}

export function RedirectSSO() {
  React.useLayoutEffect(() => {
    routeBackToLogin()
  }, [])
  return <Spinner />
}
