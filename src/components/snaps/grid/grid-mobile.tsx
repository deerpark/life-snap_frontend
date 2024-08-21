import * as React from "react"
import Masonry from "react-responsive-masonry"

import { Button } from "@src/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@src/components/ui/drawer"
import { ScrollArea } from "@src/components/ui/scroll-area"
import useRootStore from "@src/stores/root.store"
import useSessionStore from "@src/stores/session.store"

import { InfiniteLoad } from "../infinite-load"
import { ImageViewer } from "./image-viewer"
import { SnapItem } from "./snap"
import { SnapInfo } from "./snap-info"

export function GridMobile() {
  const { snap, toggleSnapDrawer, computedSnaps } = useRootStore(
    ({ snap, toggleSnapDrawer, computedSnaps }) => ({
      snap,
      toggleSnapDrawer,
      computedSnaps: computedSnaps(),
    })
  )
  const { columnFilters } = useSessionStore(({ columnFilters }) => ({
    columnFilters,
  }))

  React.useEffect(() => {}, [columnFilters])

  return (
    <>
      <ScrollArea className="flex-1">
        {computedSnaps.length ? (
          <Masonry
            columnsCount={1}
            gutter="16px"
            className="mb-4 p-5 min-h-screen">
            {computedSnaps.map((snap) => (
              <SnapItem key={snap.snap_id} snap={snap} />
            ))}
          </Masonry>
        ) : null}
        <InfiniteLoad isEmpty={!computedSnaps.length} />
      </ScrollArea>
      <ImageViewer />
      <Drawer open={!!snap} onOpenChange={toggleSnapDrawer}>
        <DrawerContent className="">
          <DrawerHeader className="text-left pb-0">
            <DrawerTitle className="font-black">{snap?.tpo}</DrawerTitle>
            <DrawerDescription className="text-xs">
              No. {snap?.snap_id}
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="flex-1 flex flex-col max-h-[calc(100vh-200px)]">
            <SnapInfo />
          </ScrollArea>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">닫기</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
