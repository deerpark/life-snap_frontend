import { useQuery } from "react-query"
import { toast } from "sonner"
import { z } from "zod"

import { GetSnapsParams, SnapsSuccessData } from "@type/remote.type"
import { Snap, snapSchema } from "@type/snap.schema"
import axiosInstance from "@api/axios-instance"
import { API_ENDPOINTS } from "@api/endpoints"

export const fetchSnapsKey = "snaps"

export const fetchSnaps = async (params: GetSnapsParams) => {
  const { data } = await axiosInstance.get<SnapsSuccessData>(
    API_ENDPOINTS.SNAPS,
    {
      params,
    }
  )
  let snaps: Snap[] = []
  let seed: number | string | null = null
  try {
    snaps = z.array(snapSchema).parse(data.snaps)
    seed = data.seed
  } catch (error) {
    toast(`${error}`)
  }
  return { snaps, seed }
}

export const useFetchSnaps = (params: GetSnapsParams) => {
  return useQuery([fetchSnapsKey, params], () => fetchSnaps(params), {
    staleTime: 24 * 60 * 60 * 1000, // 1일 캐시
    cacheTime: 24 * 60 * 60 * 1000, // 1일 캐시
  })
}
