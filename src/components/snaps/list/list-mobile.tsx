import * as React from "react"
import { Snap } from "@interface"
import { useRootStore, useSessionStore } from "@store"

import { columns, ImageViewer, SnapInfo } from "@components/snaps"
import { DataTable } from "@components/snaps/list"
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  ScrollArea,
} from "@components/ui"

interface ListMobileProps {
  data: Snap[]
}

export function ListMobile({ data }: ListMobileProps) {
  const { snap, toggleSnapDrawer } = useRootStore(
    ({ snap, toggleSnapDrawer }) => ({
      snap,
      toggleSnapDrawer,
    })
  )
  const { columnFilters } = useSessionStore(({ columnFilters }) => ({
    columnFilters,
  }))

  React.useEffect(() => {}, [columnFilters])

  return (
    <>
      <DataTable snaps={data || []} columns={columns} />
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
