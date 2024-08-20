import * as React from "react"
import { Shell } from "lucide-react"
import { Outlet } from "react-router-dom"

import { useFetchSnapFilterOptions } from "@src/hooks"
import useLocalStore from "@src/stores/local.store"

export default function SnapsPage() {
  const {
    isLoading,
    data: filterOptions,
    isError,
  } = useFetchSnapFilterOptions()
  const { setFilterOptions } = useLocalStore(({ setFilterOptions }) => ({
    setFilterOptions,
  }))

  React.useEffect(() => {
    if (!filterOptions) return

    setFilterOptions({
      jobs: filterOptions.jobs.map((job) => ({
        label: job,
        value: job,
      })),
      grades: filterOptions.grades.map((grade) => ({
        label: grade,
        value: grade,
      })),
      ages: filterOptions.ages.map((age) => ({
        label: `${age}`,
        value: `${age}`,
      })),
    })
  }, [filterOptions, setFilterOptions])

  if (isLoading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <Shell size={24} className="animate-spin" />
      </div>
    )

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        에러가 발생했습니다
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col gap-y-2 overflow-hidden">
      <Outlet />
    </div>
  )
}
