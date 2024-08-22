import { Snap } from "@interface"
import { useLocalStore, useSessionStore } from "@store"
import { X } from "lucide-react"

import { ToggleButton } from "@components/shared"
import { columns, DataFacetedFilter } from "@components/snaps"
import { Button, Tip } from "@components/ui"

interface RowCustomColumn {
  accessorKey: keyof Snap
}

export function FacetedFilters() {
  const { columnFilters, setColumnFilters } = useSessionStore(
    ({ columnFilters, setColumnFilters }) => ({
      columnFilters,
      setColumnFilters,
    })
  )
  const { columnVisibility } = useLocalStore(({ columnVisibility }) => ({
    columnVisibility,
  }))
  const facetedFilters = columns
    .filter(
      (col) =>
        col?.meta?.enableFaceted !== false &&
        columnVisibility[
          (col as RowCustomColumn).accessorKey as unknown as string
        ] !== false
    )
    .map((col) => (col as RowCustomColumn).accessorKey)
  const { toggle } = useLocalStore(({ toggle }) => ({
    toggle,
  }))
  const hasFacetedFilter = columnFilters.some(
    (f) => (f.value as string[])?.length
  )
  return (
    <>
      <ToggleButton toggleKey="facetedFilter" arrowHorizontal />
      {toggle.facetedFilter
        ? facetedFilters.map((faceted) => (
            <DataFacetedFilter
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
    </>
  )
}
