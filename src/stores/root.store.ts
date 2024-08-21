import { create } from "zustand"

import { YEAR } from "@src/lib/constants"
import { FacetedOption } from "@src/type"
import { Snap } from "@src/type/snap.schema"

import useSessionStore from "./session.store"

type RootState = {
  isSettingsOpen: boolean
  snaps: Snap[]
  setSnaps: (snaps: Snap[]) => void
  snap: Snap | null
  toggleSnapDrawer: (open: boolean) => void
  imageViwerSrc: string | null
  computedSnaps: () => Snap[]
  getFacetedData: (
    groupBy: keyof Snap
  ) => [Map<string, number>, FacetedOption[]]
}

const useRootStore = create<RootState>((set, get) => ({
  isSettingsOpen: true,
  snaps: [],
  setSnaps: (snaps) => set({ snaps }),
  snap: null,
  toggleSnapDrawer: (open) => set({ snap: open ? get().snap : null }),
  imageViwerSrc: null,
  computedSnaps() {
    const { snaps } = get()
    const { columnFilters } = useSessionStore.getState()
    return /* mockSnaps || */ snaps.filter((snap) =>
      columnFilters
        .filter((filter) => filter.value)
        .every((filter) => {
          const snapKey = filter.id as keyof Snap
          const values =
            snapKey === "birth_year"
              ? (filter.value as number[]).map((v) => YEAR - v)
              : filter.value
          return (values as unknown[])?.includes(snap[snapKey])
        })
    )
    /* .filter(
        (snap) =>
          snap.tpo?.includes(filter) ||
          snap.grade?.includes(filter) ||
          snap.job?.includes(filter) ||
          snap.city?.includes(filter) ||
          snap.option_values?.includes(filter)
      ) */
  },
  getFacetedData(groupBy) {
    const { snaps } = get()
    const facets: Map<string, number> = snaps.reduce((facets, snap) => {
      const key = `${groupBy === "birth_year" ? `${YEAR - snap[groupBy]}` : snap[groupBy]}`
      return facets.set(key, (facets.get(key) || 0) + 1)
    }, new Map())
    return [
      facets,
      Array.from(facets)
        .map(([value]) => ({ label: value, value }))
        .sort((a, b) => (a.value > b.value ? 1 : -1)),
    ]
  },
}))

export default useRootStore
