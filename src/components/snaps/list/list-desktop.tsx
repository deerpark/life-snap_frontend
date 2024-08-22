import * as React from "react"
import { Snap } from "@interface"
import { useRootStore, useSessionStore } from "@store"
import { X } from "lucide-react"

import { columns, ImageViewer, SnapInfo } from "@components/snaps"
import { DataTable } from "@components/snaps/list"
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@components/ui"

interface ListDesktopProps {
  data: Snap[]
}

export function ListDesktop({ data }: ListDesktopProps) {
  const { snap } = useRootStore(({ snap }) => ({
    snap,
  }))
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
          <DataTable snaps={data || []} columns={columns} />
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
