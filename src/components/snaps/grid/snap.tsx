import * as React from "react"
import { Snap } from "@interface"
import { useLocalStore, useRootStore } from "@store"
import { format, parse } from "date-fns"
import { Aperture, Download, Fullscreen, Shell, TextSelect } from "lucide-react"

import { env } from "@env"
import { DATE_FORMAT, GRADE_COLOR, YEAR } from "@lib/constants"
import { cn } from "@lib/utils"
import { Image } from "@components/snaps"
import { Button, Card, Separator, Tip } from "@components/ui"

interface SnapItemProps {
  snap: Snap
}

export function SnapItem({ snap }: SnapItemProps) {
  const { snap: snapInfo } = useRootStore(({ snap }) => ({
    snap,
  }))
  const { isFixedAspect, columnVisibility } = useLocalStore(
    ({ isFixedAspect, columnVisibility }) => ({
      isFixedAspect,
      columnVisibility,
    })
  )

  const isViewing = snapInfo?.snap_id === snap.snap_id

  const imageSrc = `${env.VITE_API_BASE_URL}/api/image/${snap.file_name}`

  const handleExposeImage: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (e) => {
        e.stopPropagation()
        useRootStore.setState(() => ({ imageViwerSrc: imageSrc }))
      },
      [imageSrc]
    )

  const handleDownloadImage: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (e) => {
        e.stopPropagation()

        const link = document.createElement("a")
        link.href = imageSrc
        link.download = snap.file_name
        link.style.position = "absolute"

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
      [imageSrc, snap.file_name]
    )

  const handleViewSnapInfo: React.MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = React.useCallback(
    (e) => {
      e.stopPropagation()
      useRootStore.setState(({ snap: origin }) => ({
        snap: origin?.snap_id === snap.snap_id ? null : snap,
      }))
    },
    [snap]
  )

  return (
    <div
      key={snap.snap_id}
      className={cn(
        "group/snap transition-colors rounded-2xl flex flex-col gap-y-2",
        isViewing
          ? "bg-primary text-primary-foreground ring ring-primary"
          : "hover:bg-accent"
      )}>
      <Card
        className={cn(
          "group relative rounded-2xl overflow-hidden shadow-none hover:scale-105 hover:shadow transition-all",
          isViewing ? "ring ring-primary border-primary" : "",
          isFixedAspect ? "aspect-video" : ""
        )}>
        <Image
          className={cn(isFixedAspect ? "aspect-video" : "")}
          src={imageSrc}
          loadingIcon={
            <span className="animate-spin text-muted-foreground/50">
              <Shell size={24} style={{ transform: "rotateY(180deg)" }} />
            </span>
          }
          fallbackIcon={
            <Aperture className="text-muted-foreground/50" size={24} />
          }
          alt={snap.tpo}
        />
        <div
          className={cn(
            "opacity-0 group-hover:opacity-100 transition-all bg-black/40 absolute inset-0 flex flex-col",
            snapInfo ? "gap-y-2 p-2" : "gap-y-4 p-4"
          )}
          onClick={handleViewSnapInfo}>
          <div className="flex-1 flex items-center justify-center">
            <span
              className={cn(
                "text-white/70 font-semibold cursor-default",
                snapInfo ? "text-base" : "text-lg"
              )}>
              자세히 보기
            </span>
          </div>
          <div className="flex-none flex items-center justify-end gap-x-2">
            <Tip content="이미지 확대">
              <Button
                variant="secondary"
                size="icon"
                className={snapInfo ? "flex-1 h-7 rounded-[8px]" : ""}
                onClick={handleExposeImage}>
                <Fullscreen size={snapInfo ? 14 : 20} />
              </Button>
            </Tip>
            <Tip content="이미지 다운로드">
              <Button
                variant="secondary"
                size="icon"
                className={snapInfo ? "flex-1 h-7 rounded-[8px]" : ""}
                onClick={handleDownloadImage}>
                <Download size={snapInfo ? 14 : 20} />
              </Button>
            </Tip>
            <Tip content="스냅 상세보기">
              <Button
                variant="secondary"
                size="icon"
                className={snapInfo ? "flex-1 h-7 rounded-[8px]" : ""}
                onClick={handleViewSnapInfo}>
                <TextSelect size={snapInfo ? 14 : 20} />
              </Button>
            </Tip>
          </div>
        </div>
      </Card>
      <div className="px-2 pb-4 space-y-1">
        <div
          className={cn(
            "flex items-center gap-x-3",
            isFixedAspect ? "" : "flex-wrap"
          )}>
          <div
            className={cn(
              "grow font-bold text-sm",
              isFixedAspect ? "truncate" : ""
            )}>
            {snap.tpo}
          </div>
          <div
            className={cn(
              "flex-none text-[11px] font-semibold opacity-50",
              isFixedAspect ? "truncate" : ""
            )}>
            {format(
              parse(`${snap.image_date}`, DATE_FORMAT.DATE_MINI, new Date()),
              DATE_FORMAT.DATE_WITH_YEAR
            )}
          </div>
        </div>
        <div className="flex text-[11px]/[14px] items-center gap-x-2 font-semibold opacity-70 flex-wrap">
          {columnVisibility["birth_year"] !== false ? (
            <>
              <div className={cn("flex items-center gap-x-1")}>
                <span className="rounded">{YEAR - snap.birth_year}세</span>
              </div>
              <Separator className="size-[3px] rounded" />
            </>
          ) : null}
          {columnVisibility["city"] !== false ? (
            <div className={cn("grow flex items-center gap-x-1")}>
              <span className="rounded">{snap.city}</span>
            </div>
          ) : null}
          {columnVisibility["grade"] !== false ? (
            <div className={cn("flex items-center gap-x-1")}>
              <span
                className={cn(
                  "font-bold rounded px-0.5",
                  GRADE_COLOR.BADGE[snap.grade] || GRADE_COLOR.BADGE.DEFAULT,
                  isViewing ? "bg-background" : ""
                )}>
                {snap.grade}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
