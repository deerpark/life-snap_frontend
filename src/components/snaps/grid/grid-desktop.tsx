import * as React from "react"
import { X } from "lucide-react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import { Button } from "@src/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@src/components/ui/resizable"
import { ScrollArea } from "@src/components/ui/scroll-area"
import useLocalStore from "@src/stores/local.store"
import useRootStore from "@src/stores/root.store"

import { SnapItem } from "./snap"
import { SnapInfo } from "./snap-info"

export function GridDesktop() {
  const { snap, computedSnaps } = useRootStore(({ snap, computedSnaps }) => ({
    snap,
    computedSnaps: computedSnaps(),
  }))
  const { columnsCountBreakPoints } = useLocalStore(
    ({ columnsCountBreakPoints }) => ({ columnsCountBreakPoints })
  )
  const handleCloseSnapInfo = React.useCallback(() => {
    useRootStore.setState(() => ({ snap: null }))
  }, [])
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1">
      <ResizablePanel
        id="masonry"
        defaultSize={snap ? 80 : 100}
        className="flex flex-col">
        <ScrollArea className="flex-1">
          <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
            <Masonry gutter="16px" className="mb-4 p-5">
              {computedSnaps.map((snap) => (
                <SnapItem key={snap.snap_id} snap={snap} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </ScrollArea>
      </ResizablePanel>
      {snap ? (
        <>
          <ResizableHandle id="snap-info-grab" withHandle />
          <ResizablePanel id="snap-info" defaultSize={20} className="relative">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-5 right-5 z-10"
              onClick={handleCloseSnapInfo}>
              <X size={20} />
            </Button>
            <SnapInfo header />
          </ResizablePanel>
        </>
      ) : null}
    </ResizablePanelGroup>
  )
}
