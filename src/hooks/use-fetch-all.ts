import {
  fetchSnapFilterOptions,
  fetchSnapFilterOptionsKey,
  fetchSnaps,
  fetchSnapsKey,
} from "@hook"
import { useSessionStore } from "@store"
import { useQueries } from "react-query"

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
