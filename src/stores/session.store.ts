import {
  ColumnFiltersState,
  OnChangeFn,
  SortingState,
} from "@tanstack/react-table"
import { endOfDay, startOfDay } from "date-fns"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { DATE_FORMAT, PAGE_SIZE } from "@src/lib/constants"
import { KEY } from "@src/lib/enum"
import { dateFormat } from "@src/lib/utils"
import { GetSnapsParams } from "@src/type"

type SessionState = {
  params: GetSnapsParams
  date: DateRange
  setDate: SelectRangeEventHandler
  filter: string
  setFilter: (filter: string) => void
  columnFilters: ColumnFiltersState
  setColumnFilters: OnChangeFn<ColumnFiltersState>
  sorting: SortingState
  setSorting: OnChangeFn<SortingState>
}

const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      params: {
        page: 1,
        page_size: PAGE_SIZE[1],
      },
      date: {
        from: undefined,
      },
      setDate: (date) => {
        if (date && date.to) {
          const start_date = date.from
            ? dateFormat(startOfDay(date.from), DATE_FORMAT.DATE_MINI)
            : undefined
          const end_date = dateFormat(endOfDay(date.to), DATE_FORMAT.DATE_MINI)
          set(() => ({
            params: {
              ...get().params,
              start_date,
              end_date,
            },
            date,
          }))
        }
        sessionStorage.setItem(KEY.SEED, "null")
      },
      filter: "",
      setFilter: (filter) => set({ filter }),
      columnFilters: [],
      setColumnFilters: (updater) =>
        set((state) => {
          const newState =
            typeof updater === "function"
              ? updater(state.columnFilters)
              : updater
          return { columnFilters: newState }
        }),
      sorting: [
        {
          id: "image_date",
          desc: false,
        },
      ],
      setSorting: (updater) =>
        set((state) => {
          const newState =
            typeof updater === "function" ? updater(state.sorting) : updater
          return { sorting: newState }
        }),
    }),
    {
      name: "life-snap-storage",
      storage: createJSONStorage(() => sessionStorage),
      version: 0,
    }
  )
)

export default useSessionStore
