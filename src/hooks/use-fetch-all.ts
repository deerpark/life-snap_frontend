import { useQueries } from "react-query"

import useSessionStore from "@stores/session.store"
import { fetchSnaps, fetchSnapsKey } from "@hooks/use-fetch-snaps"

import {
  fetchSnapFilterOptions,
  fetchSnapFilterOptionsKey,
} from "./use-fetch-snap-filter-options"

export const useFetchAll = () => {
  const { params } = useSessionStore(({ params }) => ({ params }))
  const queries = useQueries([
    {
      queryKey: [fetchSnapsKey, params],
      queryFn: () => fetchSnaps(params),
      staleTime: 24 * 60 * 60 * 1000, // 1일 캐시
      cacheTime: 24 * 60 * 60 * 1000, // 1일 캐시
    },
    {
      queryKey: [fetchSnapFilterOptionsKey],
      queryFn: () => fetchSnapFilterOptions(),
      staleTime: 24 * 60 * 60 * 1000, // 1일 캐시
      cacheTime: 24 * 60 * 60 * 1000, // 1일 캐시
    },
  ])

  return queries
}
