import { Column } from "@tanstack/react-table"
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpWideNarrow,
  Eye,
} from "lucide-react"

import { cn } from "@lib/utils"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={cn("truncate font-bold text-center", className)}>
        {title}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent flex items-center gap-x-2">
            <span className="truncate font-bold">{title}</span>
            <span className="border rounded-md bg-background px-1 py-0">
              {column.getIsSorted() === "desc" ? (
                <ArrowDownNarrowWide size={16} />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUpWideNarrow size={16} />
              ) : (
                <ArrowDownUp size={16} />
              )}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpWideNarrow
              size={14}
              className="mr-2 text-muted-foreground/70"
            />
            오름차순
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownNarrowWide
              size={14}
              className="mr-2 text-muted-foreground/70"
            />
            내림차순
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <Eye size={14} className="mr-2 text-muted-foreground/70" />
            숨기기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
