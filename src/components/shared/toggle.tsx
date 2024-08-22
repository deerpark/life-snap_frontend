import * as React from "react"
import { Toggle } from "@interface"
import { useLocalStore } from "@store"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleFadingPlus,
  FilterIcon,
  Settings2,
} from "lucide-react"

import { TOGGLE_LABEL } from "@lib/constants"
import { cn } from "@lib/utils"
import { Button, Tip } from "@components/ui"

interface ToggleButtonProps {
  className?: string
  toggleKey: keyof Toggle
  arrowHorizontal?: boolean
}

const toggleIcon: Record<keyof Toggle, React.ReactNode> = {
  settings: <Settings2 size={20} strokeWidth={2.5} />,
  condition: <CircleFadingPlus size={20} strokeWidth={2.5} />,
  facetedFilter: <FilterIcon size={20} strokeWidth={2.5} />,
}

export function ToggleButton({
  className,
  toggleKey,
  arrowHorizontal,
}: ToggleButtonProps) {
  const isToggle = useLocalStore(({ toggle }) => toggle[toggleKey])

  const handleToggleSettings = React.useCallback(() => {
    useLocalStore.setState(({ toggle }) => ({
      toggle: {
        ...toggle,
        [toggleKey]: !isToggle,
      },
    }))
  }, [isToggle, toggleKey])
  return (
    <Tip
      content={
        isToggle
          ? `${TOGGLE_LABEL[toggleKey]} 숨기기`
          : `${TOGGLE_LABEL[toggleKey]} 보기`
      }>
      <Button
        variant="ghost"
        className={cn(
          "flex-none flex items-center gap-x-3 text-muted-foreground text-base",
          isToggle ? "bg-accent" : "",
          className
        )}
        onClick={handleToggleSettings}>
        {toggleIcon[toggleKey]}
        {isToggle ? (
          <>
            <ChevronLeft
              size={14}
              strokeWidth={3}
              className={cn(arrowHorizontal ? "" : "hidden lg:block")}
            />
            <ChevronUp
              size={14}
              strokeWidth={3}
              className={cn(arrowHorizontal ? "hidden" : "lg:hidden")}
            />
          </>
        ) : (
          <>
            <ChevronRight
              size={14}
              strokeWidth={3}
              className={cn(arrowHorizontal ? "" : "hidden lg:block")}
            />
            <ChevronDown
              size={14}
              strokeWidth={3}
              className={cn(arrowHorizontal ? "hidden" : "lg:hidden")}
            />
          </>
        )}
      </Button>
    </Tip>
  )
}
