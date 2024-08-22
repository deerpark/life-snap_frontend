import * as React from "react"
import { useSessionStore } from "@store"
import { differenceInDays } from "date-fns"
import { ko } from "date-fns/locale"
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from "lucide-react"
import { DateRange } from "react-day-picker"

import { DATE_FORMAT, DAY_NAME } from "@lib/constants"
import { cn, dateFormat } from "@lib/utils"
import { CalendarTemplate } from "@components/snaps"
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@components/ui"

function getDateRangeFormat(date: DateRange) {
  if (!date?.from || !date.to) return ["", ""]
  const to = new Date(date.to)
  const from = new Date(date.from)
  const startDayName = DAY_NAME[from.getDay()]
  const endDayName = DAY_NAME[to.getDay()]
  const startFormattedDate =
    dateFormat(from, DATE_FORMAT.DATE_WITH_YEAR) + `(${startDayName})`
  const endFormattedDate =
    dateFormat(
      to,
      to.getFullYear() === from.getFullYear()
        ? DATE_FORMAT.DATE
        : DATE_FORMAT.DATE_WITH_YEAR
    ) + `(${endDayName})`
  return [startFormattedDate, endFormattedDate]
}

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { date, setDate } = useSessionStore(({ date, setDate }) => ({
    date,
    setDate,
  }))
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(date)
  const [startFormattedDate, endFormattedDate] = getDateRangeFormat(date)

  const templateValue = React.useMemo(() => {
    if (!selectedRange?.from || !selectedRange?.to) return "whole"
    return !selectedRange?.from ||
      !selectedRange?.to ||
      differenceInDays(selectedRange?.to, selectedRange?.from) > 365
      ? "whole"
      : `${differenceInDays(selectedRange.to, selectedRange.from)}`
  }, [selectedRange?.from, selectedRange?.to])

  const disabled = React.useMemo(() => {
    return (
      selectedRange?.from?.valueOf() === date.from?.valueOf() &&
      selectedRange?.to?.valueOf() === date.to?.valueOf()
    )
  }, [date.from, date.to, selectedRange?.from, selectedRange?.to])

  const handleSaveDateRange = React.useCallback(() => {
    if (!selectedRange?.to) return
    setDate(
      selectedRange,
      selectedRange.to,
      {},
      {} as React.MouseEvent<Element, MouseEvent>
    )
    setIsOpen(false)
  }, [selectedRange, setDate])

  const handleResetDateRange = React.useCallback(() => {
    setSelectedRange(date)
    setIsOpen(false)
  }, [date, setSelectedRange])

  React.useEffect(() => {
    setSelectedRange(date)
  }, [date])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="ghost"
          className={cn(
            "min-w-[100px] justify-start text-left font-bold flex items-center gap-x-3",
            !(date.from && date.to) ? "text-muted-foreground" : "",
            isOpen ? "bg-accent" : "",
            className
          )}>
          <CalendarIcon
            size={20}
            strokeWidth={2.5}
            className="text-muted-foreground"
          />
          {startFormattedDate ? (
            <span className="flex-1 flex items-center gap-x-1 lg:gap-x-2">
              <span>{startFormattedDate}</span>
              <span className="text-muted-foreground/50 font-normal">~</span>
              <span>{endFormattedDate}</span>
            </span>
          ) : (
            <span>기간 선택</span>
          )}
          {isOpen ? (
            <ChevronUp size={16} strokeWidth={3} />
          ) : (
            <ChevronDown size={16} strokeWidth={3} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={selectedRange?.from}
          selected={selectedRange}
          onSelect={setSelectedRange}
          weekStartsOn={1}
          numberOfMonths={2}
          locale={ko}
        />
        <Separator />
        <div className="flex items-center gap-x-3 p-3 bg-muted/30">
          <CalendarTemplate value={templateValue} onSelect={setSelectedRange} />
          <div className="flex-1 flex items-center justify-end gap-x-3">
            <Button variant="ghost" size="sm" onClick={handleResetDateRange}>
              <span>취소</span>
            </Button>
            <Button
              variant={disabled ? "secondary" : "default"}
              size="sm"
              disabled={disabled}
              onClick={handleSaveDateRange}>
              <span>적용</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
