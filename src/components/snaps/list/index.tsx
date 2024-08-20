import * as React from "react"
import { Shell } from "lucide-react"

import { KEY } from "@src/lib/enum"
import useRootStore from "@src/stores/root.store"
import useSessionStore from "@stores/session.store"
import { useFetchSnaps } from "@hooks/index"

import { columns } from "../columns"
import { DataTable } from "./table"

export function ListView() {
  const { params } = useSessionStore(({ params }) => ({ params }))
  const { isLoading, data, isError } = useFetchSnaps({
    ...params,
    seed: JSON.stringify(sessionStorage.getItem(KEY.SEED)),
  })

  React.useEffect(() => {
    if (!data) return

    useRootStore.setState(() => ({
      snaps: data.snaps,
    }))
    sessionStorage.setItem(KEY.SEED, `${data.seed}`)
  }, [data])

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
  return <DataTable snaps={data?.snaps || []} columns={columns} />
}
