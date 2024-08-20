import { BoxSelect } from "lucide-react"
import { useMedia } from "react-use"

import useRootStore from "@src/stores/root.store"
import Empty from "@components/shared/empty"

import { GridDesktop } from "./grid-desktop"
import { GridMobile } from "./grid-mobile"
import { ImageViewer } from "./image-viewer"

export function DataMasonry() {
  const isDesktop = useMedia("(min-width: 768px)")
  const { computedSnaps } = useRootStore(({ computedSnaps }) => ({
    computedSnaps: computedSnaps(),
  }))
  return computedSnaps.length ? (
    <>
      {isDesktop ? <GridDesktop /> : <GridMobile />}
      <ImageViewer />
    </>
  ) : (
    <Empty
      className="flex-1"
      icon={<BoxSelect size={48} className="text-foreground/70" />}
      title="스냅이 존재하지 않습니다."
      description="검색 조건을 변경하거나 관리자에게 스냅등록을 요청 해 주세요"
    />
  )
}
