import { X } from "lucide-react"

import { AspectToggle } from "@src/components/shared/aspect-toggle"
import { ToggleButton } from "@src/components/shared/toggle"
import { Button } from "@src/components/ui/button"
import { Tip } from "@src/components/ui/tooltip"
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
    toggle,
  } = useLocalStore(({ filterOptions, toggle }) => ({
    filterOptions,
    toggle,
  }))

  const hasParam = Object.entries(params)
    .filter(([key]) => ["age", "grade", "job"].includes(key))
    .some((p) => !!p[1])
  const hasFacetedFilter = columnFilters.some(
    (f) => (f.value as string[])?.length
  )

  return (
    <div className="flex-none flex flex-col xl:flex-row xl:items-center gap-y-4 xl:gap-y-0 xl:gap-x-4 px-4">
      <div className="flex-1 flex items-center gap-x-3 2xl:gap-x-4 gap-y-3 2xl:gap-y-4 flex-wrap">
        <ToggleButton
          toggleKey="filter"
          className="flex-none"
          arrowHorizontal
        />
        {toggle.filter ? (
          <>
            <Filter className="flex-none" column="job" options={jobs} />
            <Filter className="flex-none" column="grade" options={grades} />
            <Filter className="flex-none" column="age" options={ages} />
            {hasParam ? (
              <Tip content="초기화">
                <Button
                  variant="ghost"
                  onClick={() =>
                    useSessionStore.setState(({ params }) => ({
                      params: {
                        ...params,
                        age: undefined,
                        grade: undefined,
                        job: undefined,
                        page: 1,
                        page_size: PAGE_SIZE[1],
                      },
                    }))
                  }
                  className="flex items-center px-3 2xl:px-3 py-1 2xl:py-2 gap-x-1 2xl:gap-x-2 h-7 2xl:h-auto">
                  <X className="size-3 2xl:size-4 text-destructive" />
                </Button>
              </Tip>
            ) : null}
          </>
        ) : null}
      </div>
      <div className="flex-none flex items-center gap-x-3 2xl:gap-x-4 gap-y-3 2xl:gap-y-4 flex-wrap">
        <ToggleButton toggleKey="facetedFilter" arrowHorizontal />
        {toggle.facetedFilter
          ? facetedFilters.map((faceted) => (
              <DataGridFacetedFilter
                key={faceted}
                column={faceted}
                className="flex-none"
              />
            ))
          : null}
        {toggle.facetedFilter && hasFacetedFilter ? (
          <Tip content="초기화">
            <Button
              variant="ghost"
              onClick={() => setColumnFilters([])}
              className="flex items-center px-3 2xl:px-3 py-1 2xl:py-2 gap-x-1 2xl:gap-x-2 h-7 2xl:h-auto">
              <X className="size-3 2xl:size-4 text-destructive" />
            </Button>
          </Tip>
        ) : null}
        <div className="flex-1 2xl:hidden" />
        <AspectToggle />
        <DataViewOptions className="flex-none" />
      </div>
    </div>
  )
}
