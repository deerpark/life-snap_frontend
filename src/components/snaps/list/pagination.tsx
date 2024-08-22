import * as React from "react"
import { useRootStore, useSessionStore } from "@store"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@components/ui"

export function DataTablePagination() {
  const { hasMore, computedSnaps } = useRootStore(
    ({ hasMore, computedSnaps }) => ({
      hasMore,
      computedSnaps: computedSnaps(),
    })
  )
  const { page, setPage } = useSessionStore(({ params, setPage }) => ({
    page: params.page,
    setPage,
  }))
  const handlePrevPage = React.useCallback(() => {
    setPage(Math.max((page ?? 1) - 1, 1))
  }, [page, setPage])
  const handleNextPage = React.useCallback(() => {
    setPage((page ?? 1) + 1)
  }, [page, setPage])
  return (
    <div className="flex-none flex items-center justify-between px-4 pt-2 pb-4 gap-x-4 print:hidden">
      <span className="flex-none text-sm flex items-center gap-x-1">
        <b>{computedSnaps.length}</b>
        <span className="text-muted-foreground">개</span>
        <span className="text-muted-foreground">
          / <b className="text-foreground">{page}</b> 페이지
        </span>
      </span>
      <div className="flex items-center space-x-6 lg:space-x-8 flex-none">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="w-auto h-8 flex items-center gap-x-2"
            onClick={handlePrevPage}
            disabled={page === 1}>
            <ChevronLeft size={16} />
            <span className="hidden sm:block">이전 페이지</span>
          </Button>
          <Button
            variant="outline"
            className="w-auto h-8 flex items-center gap-x-2"
            onClick={handleNextPage}
            disabled={!hasMore}>
            <span className="hidden sm:block">다음 페이지</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
