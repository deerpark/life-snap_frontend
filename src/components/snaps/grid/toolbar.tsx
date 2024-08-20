import { CircleFadingPlus, Filter as FilterIcon, X } from "lucide-react"

import { Button } from "@src/components/ui/button"
import { PAGE_SIZE } from "@src/lib/constants"
import useLocalStore from "@src/stores/local.store"
import useSessionStore from "@src/stores/session.store"
import { Snap } from "@src/type/snap.schema"

import { columns } from "../columns"
import { Filter } from "../filter"
import { DataViewOptions } from "../view-option"
import { DataGridFacetedFilter } from "./faceted-filter"

interface RowCustomColumn {
  accessorKey: keyof Snap
}

const facetedFilters = columns
  .filter((col) => col?.meta?.enableFaceted !== false)
  .map((col) => (col as RowCustomColumn).accessorKey)

export function Toolbar() {
  const { params, columnFilters, setColumnFilters } = useSessionStore(
    ({ params, columnFilters, setColumnFilters }) => ({
      params,
      columnFilters,
      setColumnFilters,
    })
  )
  const {
    filterOptions: { jobs, grades, ages },
  } = useLocalStore(({ filterOptions }) => ({
    filterOptions,
  }))

  const hasParam = Object.entries(params)
    .filter(([key]) => ["start_date", "age", "grade", "job"].includes(key))
    .some((p) => !!p[1])
  const hasFacetedFilter = columnFilters.some(
    (f) => (f.value as string[])?.length
  )

  return (
    <div className="flex-none flex flex-col xl:flex-row xl:items-center gap-y-4 xl:gap-y-0 xl:gap-x-4 px-4">
      <div className="flex-1 flex items-center gap-x-3 2xl:gap-x-4 gap-y-3 2xl:gap-y-4 flex-wrap">
        <div className="flex-none flex items-center gap-x-1 pl-4 xl:pl-auto  text-muted-foreground">
          <CircleFadingPlus size={20} strokeWidth={2.5} />
          <span className="text-sm">조건</span>
        </div>
        <Filter className="flex-none" column="job" options={jobs} />
        <Filter className="flex-none" column="grade" options={grades} />
        <Filter className="flex-none" column="age" options={ages} />
        {hasParam ? (
          <Button
            variant="ghost"
            onClick={() =>
              useSessionStore.setState(() => ({
                params: {
                  page: 1,
                  page_size: PAGE_SIZE[1],
                },
              }))
            }
            className="flex items-center px-3 2xl:px-3 py-1 2xl:py-2 gap-x-1 2xl:gap-x-2 h-7 2xl:h-auto">
            <span className="font-bold text-destructive">초기화</span>
            <X className="size-3 2xl:size-4 text-destructive" />
          </Button>
        ) : null}
      </div>
      <div className="flex-none flex items-center gap-x-3 2xl:gap-x-4 gap-y-3 2xl:gap-y-4 flex-wrap">
        <div className="flex items-center gap-x-1 pl-4 xl:pl-auto  text-muted-foreground">
          <FilterIcon size={20} strokeWidth={2.5} />
          <span className="2xl:hidden text-sm">필터</span>
          <span className="hidden 2xl:block text-sm">결과내 필터</span>
        </div>
        {facetedFilters.map((faceted) => (
          <DataGridFacetedFilter
            key={faceted}
            column={faceted}
            className="flex-none"
          />
        ))}
        {hasFacetedFilter ? (
          <Button
            variant="ghost"
            onClick={() => setColumnFilters([])}
            className="flex items-center px-3 2xl:px-3 py-1 2xl:py-2 gap-x-1 2xl:gap-x-2 h-7 2xl:h-auto">
            <span className="font-bold text-destructive">초기화</span>
            <X className="size-3 2xl:size-4 text-destructive" />
          </Button>
        ) : null}
        <DataViewOptions className="flex-none" />
      </div>
    </div>
  )
}
