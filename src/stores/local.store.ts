import {
  OnChangeFn,
  PaginationState,
  VisibilityState,
} from "@tanstack/react-table"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { SnapFilterFacetedOptions, Theme, ViewType } from "@src/type"

type ThemeState = {
  theme: Theme
  viewType: ViewType
  columnsCountBreakPoints?: Record<number, number>
  setTheme: (theme: Theme) => void
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
      theme: "light",
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
      setTheme: (theme) => set({ theme }),
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
      version: 0,
    }
  )
)

export default useLocalStore
