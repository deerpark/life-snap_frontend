import { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import useLocalStore from "@stores/local.store"
import { PAGE_SIZE } from "@lib/constants"
import { Button } from "@components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex-none flex items-center justify-between px-2 py-4 gap-x-4 print:hidden">
      <span className="flex-none text-sm flex items-center gap-x-1">
        <span className="text-muted-foreground">검색된 방송</span>
        <b>{table.getFilteredRowModel().rows.length}</b>
        <span className="text-muted-foreground">개</span>
      </span>
      <div className="flex items-center space-x-6 lg:space-x-8 flex-none">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium whitespace-nowrap text-muted-foreground">
            페이지 당
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
              useLocalStore.setState((state) => ({
                pagination: {
                  pageSize: Number(value),
                  pageIndex: state.pagination.pageIndex,
                },
              }))
            }}>
            <SelectTrigger className="h-8 min-w-[70px] font-bold flex items-center space-x-1">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {PAGE_SIZE.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}개
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium whitespace-nowrap space-x-2">
          <span className="text-muted-foreground">페이지</span>
          <b>
            {table.getState().pagination.pageIndex + 1}{" "}
            <span className="font-normal text-muted-foreground">/</span>{" "}
            {table.getPageCount() || 1}
          </b>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden w-8 lg:w-auto h-8 sm:flex items-center gap-x-2"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <ChevronsLeft size={16} />
            <span className="hidden sm:block">첫 페이지</span>
          </Button>
          <Button
            variant="outline"
            className="hidden w-8 lg:w-auto h-8 sm:flex items-center gap-x-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <ChevronLeft size={16} />
            <span className="hidden sm:block">이전 페이지</span>
          </Button>
          <Button
            variant="outline"
            className="hidden w-8 lg:w-auto h-8 sm:flex items-center gap-x-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <span className="hidden sm:block">다음 페이지</span>
            <ChevronRight size={16} />
          </Button>
          <Button
            variant="outline"
            className="hidden w-8 lg:w-auto h-8 sm:flex items-center gap-x-2"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <span className="hidden sm:block">마지막 페이지</span>
            <ChevronsRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
