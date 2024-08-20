import { useCallback } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Settings2,
} from "lucide-react"

import { cn } from "@src/lib/utils"
import useRootStore from "@src/stores/root.store"

import { Button } from "../ui/button"
import { Tip } from "../ui/tooltip"

interface ToggleSettingsProps {
  className?: string
}

export function ToggleSettings({ className }: ToggleSettingsProps) {
  const { isSettingsOpen } = useRootStore(({ isSettingsOpen }) => ({
    isSettingsOpen,
  }))

  const handleToggleSettings = useCallback(() => {
    useRootStore.setState(() => ({
      isSettingsOpen: !isSettingsOpen,
    }))
  }, [isSettingsOpen])
  return (
    <Tip content={isSettingsOpen ? "설정 숨기기" : "설정 보기"}>
      <Button
        variant="ghost"
        className={cn(
          "flex-none flex items-center gap-x-3 text-muted-foreground text-base lg:hidden",
          className
        )}
        onClick={handleToggleSettings}>
        <Settings2 size={20} strokeWidth={2.5} />
        {isSettingsOpen ? (
          <>
            <ChevronRight
              size={14}
              strokeWidth={3}
              className="hidden lg:block"
            />
            <ChevronUp size={14} strokeWidth={3} className="lg:hidden" />
          </>
        ) : (
          <>
            <ChevronLeft
              size={14}
              strokeWidth={3}
              className="hidden lg:block"
            />
            <ChevronDown size={14} strokeWidth={3} className="lg:hidden" />
          </>
        )}
      </Button>
    </Tip>
  )
}
