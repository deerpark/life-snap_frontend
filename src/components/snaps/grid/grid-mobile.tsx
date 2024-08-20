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
  return (
    <>
      <ScrollArea className="flex-1">
        <Masonry columnsCount={1} gutter="16px" className="mb-4 p-5">
          {computedSnaps.map((snap) => (
            <SnapItem key={snap.snap_id} snap={snap} />
          ))}
        </Masonry>
      </ScrollArea>
      <Drawer open={!!snap} onOpenChange={toggleSnapDrawer}>
        <DrawerContent>
          <DrawerHeader className="text-left pb-0">
            <DrawerTitle className="font-black">{snap?.tpo}</DrawerTitle>
            <DrawerDescription className="text-xs">
              No. {snap?.snap_id}
            </DrawerDescription>
          </DrawerHeader>
          <SnapInfo />
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
