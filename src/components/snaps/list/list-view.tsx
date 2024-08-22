import * as React from "react"
import { useFetchSnaps } from "@hook"
import { useRootStore, useSessionStore } from "@store"
import { Shell } from "lucide-react"

import { KEY } from "@lib/enum"
import { Toolbar } from "@components/snaps"
import { DataList } from "@components/snaps/list"

export function ListView() {
  const { params } = useSessionStore(({ params }) => ({ params }))
  const { isLoading, data, isError } = useFetchSnaps({
    ...params,
    seed: JSON.parse(sessionStorage.getItem(KEY.SEED) || "null") as
      | string
      | number
      | null
      | undefined,
  })

  React.useEffect(() => {
    if (!data) return

    useRootStore.setState(() => ({
      snaps: data.snaps,
      hasMore: data.hasMore,
    }))
    sessionStorage.setItem(KEY.SEED, `${data.seed}`)
  }, [data])

  if (isLoading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="animate-spin">
          <Shell size={24} style={{ transform: "rotateY(180deg)" }} />
        </span>
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
    <>
      <Toolbar />
      <DataList data={data?.snaps || []} />
    </>
  )
}
