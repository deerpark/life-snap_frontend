import * as React from "react"
import { RootResponse } from "@interface"
import { API } from "@remote"
import { Aperture } from "lucide-react"
import { Link, Outlet, useLocation, useRouteLoaderData } from "react-router-dom"
import { useSearchParam } from "react-use"

import { TITLE } from "@lib/constants"
import { PAGENAMES } from "@lib/enum"
import { cn, sendToAnalyticsPageView, setOnceAnalyticsUserId } from "@lib/utils"
import { Settings, ToggleButton } from "@components/shared"
import { DatePickerWithRange, SnapSearch } from "@components/snaps"
import { buttonVariants, Separator, Tip } from "@components/ui"

export function Layout() {
  const token = useSearchParam("token")
  const location = useLocation()
  const { data } = useRouteLoaderData("root") as RootResponse

  React.useEffect(() => {
    if (data?.user) {
      setOnceAnalyticsUserId(data.user?.team_nm || "오픈이노베이션팀")
    }
  }, [data])

  React.useEffect(() => {
    if (token) {
      API.setAccessToken(token)
      window.location.href = `${PAGENAMES.HOME}`
    }
  }, [token])

  React.useEffect(() => {
    sendToAnalyticsPageView(location.pathname + location.search)
  }, [location])
  return (
    <div
      className="h-screen flex flex-col bg-background overflow-hidden"
      vaul-drawer-wrapper="true">
      <header className="flex flex-col lg:flex-row lg:items-center px-4 py-3 flex-none gap-y-4 lg:gap-y-0 lg:gap-x-6 print:hidden">
        <div className="flex-none flex items-center justify-between lg:justify-start">
          <Tip content={TITLE}>
            <div className="flex-none flex items-center gap-x-4 pr-2">
              <Link
                to="/"
                className={cn(
                  "flex items-center gap-x-2 text-primary",
                  buttonVariants({ variant: "ghost" })
                )}>
                <Aperture size={24} strokeWidth={2.2} />
                <span className="font-black text-base/5 hidden sm:block">
                  {TITLE}
                </span>
              </Link>
              <h1 className="sr-only">{TITLE}</h1>
            </div>
          </Tip>
          <div className="flex-1 lg:hidden" />
          <DatePickerWithRange className="flex-none" />
          <ToggleButton
            toggleKey="settings"
            className="ml-3 lg:ml-0 lg:hidden"
          />
        </div>
        <div className="flex-1 flex items-center">
          <SnapSearch />
        </div>
        <ToggleButton toggleKey="settings" className="hidden lg:flex" />
        <Settings />
      </header>
      <Separator className="lg:hidden opacity-50 mt-4 mb-6" />
      <Outlet />
    </div>
  )
}
