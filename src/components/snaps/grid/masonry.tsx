import { useMedia } from "react-use"

import { GridDesktop } from "./grid-desktop"
import { GridMobile } from "./grid-mobile"

export function DataMasonry() {
  const isDesktop = useMedia("(min-width: 768px)")

  if (!isDesktop) return <GridMobile />
  return <GridDesktop />
}
