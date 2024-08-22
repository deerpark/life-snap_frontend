import {
  SnapFilterOptions,
  snapFilterOptionSchema,
  SnapFilterOptionsSuccessData,
} from "@interface"
import { API, API_ENDPOINTS } from "@remote"
import { useQuery } from "react-query"
import { toast } from "sonner"

import { env } from "@env"
import { filters as mockFilters } from "@mock/filters"

export const fetchSnapFilterOptionsKey = "snap-filter-options"

export const fetchSnapFilterOptions = async () => {
  const { data } = await API.get<SnapFilterOptionsSuccessData>(
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
    snapFilterOptions = mockFilters
  }
  if (env.VITE_USE_PROXY) {
    return mockFilters
  }
  return snapFilterOptions
}

export const useFetchSnapFilterOptions = () => {
  return useQuery([fetchSnapFilterOptionsKey], () => fetchSnapFilterOptions(), {
    staleTime: 24 * 60 * 60 * 1000, // 1일 캐시
    cacheTime: 24 * 60 * 60 * 1000, // 1일 캐시
  })
}
