/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { ColumnDef, VisibilityState } from "@tanstack/react-table"
import { cloneDeep } from "lodash"
import { Check, ChevronDown, ChevronUp, Eye } from "lucide-react"

import { Snap } from "@src/type/snap.schema"
import useLocalStore from "@stores/local.store"
import { PROPERTY_LABEL } from "@lib/constants"
import { cn } from "@lib/utils"
import { Button } from "@components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { Separator } from "@components/ui/separator"
import { Tip } from "@components/ui/tooltip"
import { columns as tableColumns } from "@components/snaps/columns"

interface DataViewOptionsProps {
  className?: string
}

export function DataViewOptions({ className }: DataViewOptionsProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [columns, setColumns] = React.useState<VisibilityState>({})
  const { columnVisibility, setColumnVisibility } = useLocalStore(
    ({ columnVisibility, setColumnVisibility }) => ({
      columnVisibility,
      setColumnVisibility,
    })
  )

  const options = (
    tableColumns as (ColumnDef<Snap> & { accessorKey: string })[]
  )
    .filter((col) => col.enableHiding)
    .map((col) => col.accessorKey)

  const handleToggleComumnVisiility = React.useCallback(
    (key: string, value: boolean) => {
      setColumns({ ...columns, [key]: value })
    },
    [columns]
  )
  const handleSaveColumnVisibility = React.useCallback(() => {
    setColumnVisibility({ ...columns })
    setIsOpen(false)
  }, [columns])

  React.useEffect(() => {
    const newColumnVisibility = cloneDeep(columnVisibility || {})
    options.forEach((op) => {
      newColumnVisibility[op] =
        columnVisibility[op] === undefined ? true : !!columnVisibility[op]
    })
    setColumns(newColumnVisibility)
    setColumnVisibility(newColumnVisibility)
  }, [])

  React.useEffect(() => {
    if (isOpen === false) {
      setColumns(columnVisibility)
    }
  }, [isOpen])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div>
          <Tip content="속성 사용자화" className="2xl:hidden">
            <Button
              variant="ghost"
              className={cn(
                "flex items-center px-3 2xl:px-3 py-1 2xl:py-2 gap-x-1 2xl:gap-x-2 h-7 2xl:h-auto",
                isOpen ? "bg-accent" : "",
                className
              )}
              title="속성 사용자화">
              <Eye size={20} />
              <span className="flex-1 font-bold hidden 2xl:block">
                속성 사용자화
              </span>
              {isOpen ? (
                <ChevronUp size={16} strokeWidth={3} />
              ) : (
                <ChevronDown size={16} strokeWidth={3} />
              )}
            </Button>
          </Tip>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[140px] flex flex-col justify-stretch p-0">
        <div className="flex flex-col p-1 divide-y divide-border/30">
          {options.map((column) => {
            return (
              <div
                key={column}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-secondary-foreground outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 gap-x-2 hover:bg-accent"
                onClick={() => {
                  handleToggleComumnVisiility(
                    column,
                    !(columns[column] !== false)
                  )
                }}>
                {columns[column] !== false ? (
                  <Check size={16} className="flex-none" />
                ) : (
                  <span className="size-4 flex-none" />
                )}
                <span
                  className={cn(
                    "truncate flex-1",
                    columns[column] !== false
                      ? "font-semibold opacity-75"
                      : "opacity-50"
                  )}>
                  {PROPERTY_LABEL[column as keyof typeof PROPERTY_LABEL] ||
                    column}
                </span>
              </div>
            )
          })}
        </div>
        <Separator className="h-px opacity-50" />
        <div className="flex flex-col p-1">
          <Button
            variant="ghost"
            key="save"
            size="sm"
            /* disabled={} */
            className="relative flex select-none items-center rounded-sm px-2 py-1.5 outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 gap-x-2 cursor-pointer"
            onClick={handleSaveColumnVisibility}>
            <span className="font-semibold text-primary/80">적용</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
