import { AspectToggle } from "@components/shared"
import { Conditions, DataViewOptions, FacetedFilters } from "@components/snaps"

export function Toolbar() {
  return (
    <div className="flex-none flex flex-col xl:flex-row xl:items-center gap-y-4 xl:gap-y-0 xl:gap-x-4 px-4">
      <div className="flex-1 flex items-center gap-x-3 2xl:gap-x-4 gap-y-3 2xl:gap-y-4 flex-wrap">
        <Conditions />
      </div>
      <div className="flex-none flex items-center gap-x-3 2xl:gap-x-4 gap-y-3 2xl:gap-y-4 flex-wrap">
        <FacetedFilters />
        <div className="flex-1 2xl:hidden" />
        <AspectToggle />
        <DataViewOptions className="flex-none" />
      </div>
    </div>
  )
}
