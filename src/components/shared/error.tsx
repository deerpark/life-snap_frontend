import { isRouteErrorResponse, useRouteError } from "react-router-dom"

export function ErrorBoundary() {
  const error = useRouteError()

  // 오류 객체가 ErrorResponse인지 검사
  if (isRouteErrorResponse(error)) {
    return (
      <div className="h-screen flex flex-col bg-background overflow-hidden justify-center items-center gap-y-3">
        <h1 className="text-2xl font-black">{error.status}</h1>
        <p className="">{error.statusText}</p>
        <pre className="text-xs text-muted-foreground">
          {JSON.stringify(error.data, null, 2)}
        </pre>
      </div>
    )
  }

  // 기타 알 수 없는 오류에 대한 처리
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden justify-center items-center gap-y-3">
      <h1 className="text-2xl font-black">에러</h1>
      <p>{(error as Error)?.message || "알수 없는 에러가 발생 했습니다."}</p>
    </div>
  )
}
