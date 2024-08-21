import * as React from "react"
import { parse } from "date-fns"

import { ScrollArea } from "@src/components/ui/scroll-area"
import { Separator } from "@src/components/ui/separator"
import { env } from "@src/env"
import {
  DATE_FORMAT,
  GRADE_COLOR,
  PROPERTY_LABEL,
  YEAR,
} from "@src/lib/constants"
import { cn, dateFormat } from "@src/lib/utils"
import useLocalStore from "@src/stores/local.store"
import useRootStore from "@src/stores/root.store"
import { Image } from "@components/snaps/image"

interface SnapInfoProps {
  header?: boolean
}

export function SnapInfo({ header }: SnapInfoProps) {
  const { columnVisibility } = useLocalStore(({ columnVisibility }) => ({
    columnVisibility,
  }))
  const { snap } = useRootStore(({ snap }) => ({
    snap,
  }))
  const [dimensions, setDimensions] = React.useState<{
    width: number
    height: number
  } | null>({
    width: 0,
    height: 0,
  })
  if (!snap) return null
  const imageSrc = `${env.VITE_API_BASE_URL}/api/image/${snap.file_name}`
  return (
    <ScrollArea className="flex-1 flex flex-col h-full px-5 py-2">
      <div className="text-sm grid gap-3">
        {header ? (
          <h2 className="sticky top-0 py-3 bg-background">
            <span className="flex items-center gap-x-1">
              <span className="text-xs text-muted-foreground/50">No.</span>
              <span className="text-xs text-muted-foreground">
                {snap.snap_id}
              </span>
            </span>
            <span className="block text-xl font-black">{snap.tpo}</span>
          </h2>
        ) : null}
        <h3 className="font-semibold sticky top-14 py-3 bg-gradient-to-b from-background via-75% via-background to-transparent">
          기본 정보
        </h3>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">등록일</span>
            <span>
              {dateFormat(new Date(snap.reg_dtm), DATE_FORMAT.DATE_WITH_YEAR)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">등록자</span>
            <span>{snap.reg_id}</span>
          </li>
        </ul>
        <Separator className="my-2" />
        <h3 className="font-semibold sticky top-14 py-3 bg-gradient-to-b from-background via-75% via-background to-transparent">
          고객 정보
        </h3>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {PROPERTY_LABEL["customer_id"]}
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground">
              {snap.customer_id}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {PROPERTY_LABEL["image_date"]}
            </span>
            <span>
              {dateFormat(
                parse(snap.image_date, DATE_FORMAT.DATE_MINI, new Date()),
                DATE_FORMAT.DATE_WITH_YEAR
              )}
            </span>
          </li>
          {columnVisibility["grade"] !== false ? (
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {PROPERTY_LABEL["grade"]}
              </span>
              <span
                className={cn(
                  "text-[11px] font-semibold rounded",
                  GRADE_COLOR.BADGE[snap.grade] || GRADE_COLOR.BADGE.DEFAULT
                )}>
                {snap.grade}
              </span>
            </li>
          ) : null}
          {columnVisibility["birth_year"] !== false ? (
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {PROPERTY_LABEL["birth_year"]}
              </span>
              <span className="flex items-center gap-x-1">
                <span className="text-muted-foreground/50">
                  ({snap.birth_year})
                </span>
                <span>{YEAR - snap.birth_year}세</span>
              </span>
            </li>
          ) : null}
          {columnVisibility["job"] !== false ? (
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {PROPERTY_LABEL["job"]}
              </span>
              <span>{snap.job}</span>
            </li>
          ) : null}
          {columnVisibility["city"] !== false ? (
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {PROPERTY_LABEL["city"]}
              </span>
              <span>{snap.city}</span>
            </li>
          ) : null}
        </ul>
        {columnVisibility["option_values"] !== false ? (
          <>
            <Separator className="my-2" />
            <h3 className="font-semibold sticky top-14 py-3 bg-gradient-to-b from-background via-75% via-background to-transparent">
              추가 정보
            </h3>
            <ul className="grid gap-3">
              {snap.options?.split(",").map((optionName, optionIndex) => {
                return (
                  <li
                    key={optionName}
                    className="flex items-center justify-between">
                    <span className="text-muted-foreground">{optionName}</span>
                    <span>{snap.option_values?.split(",")[optionIndex]}</span>
                  </li>
                )
              })}
            </ul>
          </>
        ) : null}
        <Separator className="my-2" />
        <div className="space-y-4 pb-4">
          <h3 className="font-semibold sticky top-14 py-3 bg-gradient-to-b from-background via-75% via-background to-transparent">
            이미지
          </h3>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">가로</span>
              <span>{dimensions?.width}px</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">세로</span>
              <span>{dimensions?.height}px</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">파일명</span>
              <span>{snap.file_name}</span>
            </li>
          </ul>
          <Image
            containerClassName="static"
            className="cursor-pointer rounded-sm"
            src={imageSrc}
            alt=""
            setDimensions={setDimensions}
            onClick={() => {
              useRootStore.setState(() => ({ imageViwerSrc: imageSrc }))
            }}
          />
        </div>
      </div>
    </ScrollArea>
  )
}
