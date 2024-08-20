import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { TooltipProps } from "@radix-ui/react-tooltip"

import { cn } from "@lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 10, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-2xl shadow-primary/30 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

type TipProps = {
  content: React.ReactNode
  className?: string
} & TooltipProps &
  React.PropsWithChildren

export const Tip = React.forwardRef<HTMLButtonElement, TipProps>(
  function TipComponent(
    {
      children,
      content,
      open,
      defaultOpen,
      onOpenChange,
      className,
      ...props
    }: TipProps,
    ref
  ) {
    return (
      <TooltipPrimitive.Root
        delayDuration={100}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild ref={ref}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side="top"
          align="center"
          sideOffset={10}
          className={cn(
            "z-50 overflow-hidden rounded-md bg-popover px-2 py-0.5 text-[11px] text-muted-foreground font-semibold shadow",
            className
          )}
          {...props}>
          {content}
          <TooltipPrimitive.Arrow
            width={6}
            height={2}
            className="fill-popover"
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    )
  }
)
