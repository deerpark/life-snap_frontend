import * as React from "react"
import { useSessionStore } from "@store"
import { debounce } from "lodash"
import { Search } from "lucide-react"

import { PAGE_SIZE } from "@lib/constants"
import { KEY } from "@lib/enum"
import { Input } from "@components/ui"

export function SnapSearch() {
  const { params } = useSessionStore(({ params }) => ({ params }))

  const debouncedHandleChangeKeyword = React.useMemo(
    () =>
      debounce<React.ChangeEventHandler<HTMLInputElement>>((e) => {
        const text = e.target.value || ""
        useSessionStore.setState((state) => ({
          params: {
            ...state.params,
            text,
            page: 1,
            page_size: PAGE_SIZE[1],
          },
        }))
        sessionStorage.setItem(KEY.SEED, "null")
      }, 500),
    [] // params가 의존성 배열에 포함됩니다.
  )

  React.useEffect(() => {
    // 컴포넌트가 언마운트될 때 debounce된 함수가 클린업됩니다.
    return () => {
      debouncedHandleChangeKeyword.cancel()
    }
  }, [debouncedHandleChangeKeyword])

  return (
    <div className="relative flex-1">
      <Search
        size={20}
        strokeWidth={3}
        className="text-muted-foreground absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none"
      />
      <Input
        type="search"
        placeholder="스냅 검색.."
        defaultValue={params.text || ""}
        onChange={debouncedHandleChangeKeyword}
        className="h-12 w-full pl-12 border-border/50 font-bold placeholder:font-normal rounded-full text-lg placeholder:text-base placeholder:text-muted-foreground focus-visible:bg-muted/70 focus-visible:ring-offset-0 focus-visible:ring"
      />
    </div>
  )
}
