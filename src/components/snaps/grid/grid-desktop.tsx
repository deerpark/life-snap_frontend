import * as React from "react"
import { useLocalStore, useRootStore, useSessionStore } from "@store"
import { X } from "lucide-react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import { ImageViewer, InfiniteLoad, SnapInfo } from "@components/snaps"
import { SnapItem } from "@components/snaps/grid"
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
} from "@components/ui"

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
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 border-t border-border/50">
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
