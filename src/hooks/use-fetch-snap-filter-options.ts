import { useQuery } from "react-query"
import { toast } from "sonner"

import { SnapFilterOptionsSuccessData } from "@type/remote.type"
import { SnapFilterOptions, snapFilterOptionSchema } from "@type/snap.schema"
import axiosInstance from "@api/axios-instance"
import { API_ENDPOINTS } from "@api/endpoints"

export const fetchSnapFilterOptionsKey = "snap-filter-options"

export const fetchSnapFilterOptions = async () => {
  const { data } = await axiosInstance.get<SnapFilterOptionsSuccessData>(
    API_ENDPOINTS.FILTER
  )
  let snapFilterOptions: SnapFilterOptions = {
    jobs: [],
    grades: [],
    ages: [],
  }
  try {
    snapFilterOptions = snapFilterOptionSchema.parse(data)
  } catch (error) {
    toast(`${error}`)
  }
  return snapFilterOptions
}

export const useFetchSnapFilterOptions = () => {
  return useQuery([fetchSnapFilterOptionsKey], () => fetchSnapFilterOptions(), {
    staleTime: 24 * 60 * 60 * 1000, // 1일 캐시
    cacheTime: 24 * 60 * 60 * 1000, // 1일 캐시
  })
}
