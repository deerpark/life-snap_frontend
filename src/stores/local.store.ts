import {
  OnChangeFn,
  PaginationState,
  VisibilityState,
} from "@tanstack/react-table"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { SnapFilterFacetedOptions, Theme, Toggle, ViewType } from "@src/type"

type ThemeState = {
  toggle: Toggle
  theme: Theme
  setTheme: (theme: Theme) => void
  isFixedAspect: boolean
  setFixedAspect: (isFixedAspect: boolean) => void
  viewType: ViewType
  columnsCountBreakPoints?: Record<number, number>
  columns: unknown[]
  columnVisibility: VisibilityState
  setColumnVisibility: OnChangeFn<VisibilityState>
  pagination: PaginationState
  setPagination: OnChangeFn<PaginationState>
  filterOptions: SnapFilterFacetedOptions
  setFilterOptions: (filterOptions: SnapFilterFacetedOptions) => void
}

const useLocalStore = create<ThemeState>()(
  persist(
    (set) => ({
      toggle: {
        settings: false,
        filter: true,
        facetedFilter: false,
      },
      theme: "light",
      setTheme: (theme) => set({ theme }),
      isFixedAspect: false,
      setFixedAspect: (isFixedAspect) => set({ isFixedAspect }),
      viewType: "/snaps/grid",
      columnsCountBreakPoints: {
        350: 1,
        496: 2,
        644: 3,
        864: 4,
        1084: 5,
        1034: 6,
        1524: 7,
        1744: 8,
      },
      columns: [],
      columnVisibility: {},
      setColumnVisibility: (updater) =>
        set((state) => {
          const newState =
            typeof updater === "function"
              ? updater(state.columnVisibility)
              : updater
          return { columnVisibility: newState }
        }),
      pagination: { pageSize: 50, pageIndex: 0 },
      setPagination: (updater) =>
        set((state) => {
          const newState =
            typeof updater === "function" ? updater(state.pagination) : updater
          return { pagination: newState }
        }),
      filterOptions: {
        jobs: [],
        grades: [],
        ages: [],
      },
      setFilterOptions(filterOptions) {
        set(() => ({ filterOptions }))
      },
    }),
    {
      name: "life-snap-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
)

export default useLocalStore
