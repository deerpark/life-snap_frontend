import * as React from "react"
import { Snap } from "@interface"
import { useRootStore } from "@store"
import { ColumnDef, flexRender } from "@tanstack/react-table"
import { ChartNoAxesGantt } from "lucide-react"

import { cn } from "@lib/utils"
import { useTable } from "@hooks/use-table"
import { DataTablePagination } from "@components/snaps/list"
import {
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  snaps: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  snaps,
}: DataTableProps<TData, TValue>) {
  const table = useTable({
    data: snaps,
    columns,
  })

  const handleViewSnapInfo = React.useCallback((row?: Snap) => {
    if (!row) return
    console.log(row)
    useRootStore.setState(({ snap: origin }) => ({
      snap: origin?.snap_id === row.snap_id ? null : row,
    }))
  }, [])

  return (
    <>
      <div className="flex-1 relative flex flex-col">
        <ScrollArea
          className="border-y flex-1 flex flex-col !absolute inset-0"
          horizontal>
          <Table
            className="overflow-visible static w-auto"
            tableClassName={cn(
              table.getRowModel().rows?.length &&
                table.getRowModel().rows?.length <
                  table.getState().pagination.pageSize
                ? ""
                : "flex-1"
            )}>
            <TableHeader className="sticky top-0 z-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-2 py-0 bg-muted/80">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="z-10">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleViewSnapInfo(row.original as Snap)}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="py-20 text-center text-xs text-muted-foreground">
                    <div className="gap-y-4 flex flex-col items-center">
                      <ChartNoAxesGantt
                        size={48}
                        strokeWidth={1}
                        className="opacity-70"
                      />
                      <span>데이터가 존재하지 않습니다.</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <DataTablePagination />
    </>
  )
}
