import { parse } from "url"
import { HttpProxy } from "vite"

import { filters } from "./src/mock/filters"
import { snaps } from "./src/mock/snaps"

export function httpProxyMiddleware(proxy: HttpProxy.Server) {
  proxy.on("proxyReq", (proxyReq, req, res) => {
    const parsedUrl = parse(req.url || "", true)
    const pathname = parsedUrl.pathname
    if (pathname === "/snaps") {
      // 목업 데이터 응답 처리
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(snaps))
      proxyReq.destroy() // 프록시 요청 중단
    } else if (pathname === "/snaps/filters") {
      // 목업 데이터 응답 처리
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(filters))
      proxyReq.destroy() // 프록시 요청 중단
    }
  })
}
