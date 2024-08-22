import { GetSnapsParams, Snap, snapSchema, SnapsSuccessData } from "@interface"
import { API, API_ENDPOINTS } from "@remote"
import { useQuery } from "react-query"
import { toast } from "sonner"
import { z } from "zod"

import { env } from "@env"
import { snaps as mockSnaps } from "@mock/snaps"

export const fetchSnapsKey = "snaps"

export const fetchSnaps = async (params: GetSnapsParams) => {
  const { data } = await API.get<SnapsSuccessData>(API_ENDPOINTS.SNAPS, {
    params,
  })
  let snaps: Snap[] = []
  let seed: number | string | null = null
  let hasMore = false
  try {
    snaps = z.array(snapSchema).parse(data.snaps)
    seed = data.seed
    hasMore = data.hasMore
  } catch (error) {
    toast((error as Error).message)
  }
  if (env.VITE_USE_PROXY) {
    return mockSnaps
  }
  return { snaps, seed, hasMore }
}

export const useFetchSnaps = (params: GetSnapsParams) => {
  return useQuery([fetchSnapsKey, params], () => fetchSnaps(params), {
    staleTime: 24 * 60 * 60 * 1000, // 1일 캐시
    cacheTime: 24 * 60 * 60 * 1000, // 1일 캐시
  })
}
