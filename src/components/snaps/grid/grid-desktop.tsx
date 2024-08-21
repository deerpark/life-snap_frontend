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
import useSessionStore from "@src/stores/session.store"

import { InfiniteLoad } from "../infinite-load"
import { ImageViewer } from "./image-viewer"
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
  const { columnFilters } = useSessionStore(({ columnFilters }) => ({
    columnFilters,
  }))
  const handleCloseSnapInfo = React.useCallback(() => {
    useRootStore.setState(() => ({ snap: null }))
  }, [])

  React.useEffect(() => {}, [columnFilters])

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel
          id="panel-left"
          order={1}
          minSize={50}
          defaultSize={snap ? 80 : 100}
          className="flex flex-col">
          <ScrollArea id="snaps-masonry" className="flex-1">
            {computedSnaps.length ? (
              <ResponsiveMasonry
                columnsCountBreakPoints={columnsCountBreakPoints}>
                <Masonry gutter="16px" className="mb-4 p-5 min-h-screen">
                  {computedSnaps.map((snap) => (
                    <SnapItem key={snap.snap_id} snap={snap} />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            ) : null}
            <InfiniteLoad isEmpty={!computedSnaps.length} />
          </ScrollArea>
        </ResizablePanel>
        {snap ? (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel
              id="panel-right"
              minSize={15}
              order={2}
              defaultSize={20}
              className="relative">
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
      <ImageViewer />
    </>
  )
}
