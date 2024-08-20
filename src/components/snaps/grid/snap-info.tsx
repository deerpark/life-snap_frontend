import { parse } from "date-fns"

import { ScrollArea } from "@src/components/ui/scroll-area"
import { Separator } from "@src/components/ui/separator"
import {
  DATE_FORMAT,
  GRADE_COLOR,
  PROPERTY_LABEL,
  YEAR,
} from "@src/lib/constants"
import { cn, dateFormat } from "@src/lib/utils"
import useRootStore from "@src/stores/root.store"

interface SnapInfoProps {
  header?: boolean
}

export function SnapInfo({ header }: SnapInfoProps) {
  const { snap } = useRootStore(({ snap }) => ({ snap }))
  if (!snap) return null
  return (
    <ScrollArea className="flex-1 flex flex-col h-full px-5 py-5">
      {header ? (
        <h2 className="flex-1">
          <span className="flex items-center gap-x-1">
            <span className="text-xs text-muted-foreground/50">No.</span>
            <span className="text-xs font-semibold text-muted-foreground">
              {snap.snap_id}
            </span>
          </span>
          <span className="block text-xl font-black">{snap.tpo}</span>
        </h2>
      ) : null}
      <div className="text-sm py-5">
        <div className="grid gap-3">
          <div className="font-semibold">기본 정보</div>
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
          <div className="font-semibold">고객 정보</div>
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
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {PROPERTY_LABEL["birth_year"]}
              </span>
              <span className="flex items-center gap-x-1">
                <span className="opacity-50">({snap.birth_year})</span>
                <span>{YEAR - snap.birth_year}세</span>
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {PROPERTY_LABEL["job"]}
              </span>
              <span>{snap.job}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {PROPERTY_LABEL["city"]}
              </span>
              <span>{snap.city}</span>
            </li>
            {/* <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Total</span>
                        <span>$329.00</span>
                      </li> */}
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">추가 정보</div>
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
        </div>
      </div>
    </ScrollArea>
  )
}
