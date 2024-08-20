import * as React from "react"
import { subDays } from "date-fns"
import { DateRange } from "react-day-picker"

import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group"

interface CalendarTemplateProps {
  value: string
  onSelect: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export function CalendarTemplate({ value, onSelect }: CalendarTemplateProps) {
  const handleChangeValue = React.useCallback(
    (v: string) => {
      if (!v) return
      onSelect({
        from: v === "whole" ? undefined : subDays(new Date(), Number(v)),
        to: new Date(),
      })
    },
    [onSelect]
  )
  return (
    <ToggleGroup value={value} type="single" onValueChange={handleChangeValue}>
      <ToggleGroupItem value="30" aria-label="1달">
        <span>1달</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="90" aria-label="3달">
        <span>3달</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="365" aria-label="1년">
        <span>1년</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="whole" aria-label="전체">
        <span>전체</span>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
