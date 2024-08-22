import { useLocalStore, useSessionStore } from "@store"
import { rankItem } from "@tanstack/match-sorter-utils"
import {
  ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  TableState,
  useReactTable,
} from "@tanstack/react-table"

interface useTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  initialState?: Partial<TableState>
}

export function useTable<TData, TValue>({
  data,
  columns,
  initialState,
}: useTableProps<TData, TValue>) {
  const { columnFilters, setColumnFilters, sorting, setSorting } =
    useSessionStore(
      ({ columnFilters, setColumnFilters, sorting, setSorting }) => ({
        columnFilters,
        setColumnFilters,
        sorting,
        setSorting,
      })
    )
  const { columnVisibility, setColumnVisibility, pagination, setPagination } =
    useLocalStore(
      ({
        columnVisibility,
        setColumnVisibility,
        pagination,
        setPagination,
      }) => ({
        columnVisibility,
        setColumnVisibility,
        pagination,
        setPagination,
      })
    )
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
      ...initialState,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: (row, columnId, filterValue) => {
      return rankItem(row.getValue(columnId), filterValue).passed
    },
  })

  return table
}
