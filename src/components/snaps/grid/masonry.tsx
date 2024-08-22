import { useMedia } from "react-use"

import { GridDesktop, GridMobile } from "@components/snaps/grid"

export function DataMasonry() {
  const isDesktop = useMedia("(min-width: 768px)")

  if (!isDesktop) return <GridMobile />
  return <GridDesktop />
}
