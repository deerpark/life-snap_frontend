import { Snap } from "@interface"
import { useMedia } from "react-use"

import { ListDesktop, ListMobile } from "@components/snaps/list"

interface DataListProps {
  data: Snap[]
}

export function DataList({ data }: DataListProps) {
  const isDesktop = useMedia("(min-width: 768px)")

  if (!isDesktop) return <ListMobile data={data || []} />
  return <ListDesktop data={data || []} />
}
