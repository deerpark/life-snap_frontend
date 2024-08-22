/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { Snap } from "@interface"
import { useRootStore, useSessionStore } from "@store"
import { ColumnFilter, ColumnFiltersState } from "@tanstack/react-table"
import {
  Check,
  ChevronDown,
  ChevronUp,
  CirclePlus,
  TicketX,
} from "lucide-react"

import { PROPERTY_LABEL } from "@lib/constants"
import { cn } from "@lib/utils"
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Separator,
} from "@components/ui"

interface DataFacetedFilterProps {
  column: keyof Snap
  className?: string
}

export function DataFacetedFilter({
  column,
  className,
}: DataFacetedFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { getFacetedData } = useRootStore(({ getFacetedData }) => ({
    getFacetedData,
  }))
  const { columnFilters, setColumnFilters } = useSessionStore(
    ({ columnFilters, setColumnFilters }) => ({
      columnFilters,
      setColumnFilters,
    })
  )
  const title = PROPERTY_LABEL[column]
  const [facets, options] = getFacetedData(column)

  const columnFilter = React.useMemo(
    () =>
      columnFilters.find((c) => c.id === column) ||
      ({
        id: column,
        value: [],
      } as ColumnFilter),
    [columnFilters, column]
  )

  const selectedValues = React.useMemo(
    () => new Set((columnFilter.value as string[]).map((v) => `${v}`)),
    [column, columnFilter.value]
  )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={!options.length}
          className={cn(
            "border-dashed flex items-center px-3 2xl:px-3 py-1 2xl:py-2 gap-x-1 2xl:gap-x-2 h-7 2xl:h-auto",
            isOpen ? "bg-accent" : "",
            className
          )}>
          <CirclePlus className="size-3 2xl:size-4" />
          <span className="font-bold">{title}</span>
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="h-3 2xl:h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal">
                    {selectedValues.size}개 선택됨
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(`${option.value}`))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal max-w-28">
                        <span className="block truncate">{option.label}</span>
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
          {isOpen ? (
            <ChevronUp className="size-3 2xl:size-4" strokeWidth={3} />
          ) : (
            <ChevronDown className="size-3 2xl:size-4" strokeWidth={3} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} disabled={!options.length} />
          <CommandList>
            <CommandEmpty>
              <div className="flex justify-center pb-2 text-muted-foreground">
                <TicketX size={24} strokeWidth={1.5} />
              </div>
              <div className="font-semibold text-muted-foreground pb-2">
                스냅이 존재하지 않습니다.
              </div>
              <div className="text-muted-foreground/70 text-xs">
                검색 조건을 변경하거나
                <br />
                관리자에게 스냅 등록을
                <br />
                요청하세요.
              </div>
            </CommandEmpty>
            <ScrollArea className="flex flex-col justify-stretch max-h-[300px]">
              <CommandGroup>
                {options
                  .filter((option) => facets.get(`${option.value}`))
                  .map((option) => {
                    const value = `${option.value}`
                    const isSelected = selectedValues.has(value)
                    return (
                      <CommandItem
                        key={value}
                        disabled={!facets?.get(value)}
                        onSelect={() => {
                          if (isSelected) {
                            selectedValues.delete(value)
                          } else {
                            selectedValues.add(value)
                          }
                          const filterValues = Array.from(selectedValues)
                          const newColumnFilters = [
                            ...columnFilters.filter((c) => c.id !== column),
                            filterValues.length
                              ? {
                                  id: column,
                                  value: filterValues.length
                                    ? column === "birth_year"
                                      ? filterValues.map((v) => Number(v))
                                      : filterValues
                                    : [],
                                }
                              : undefined,
                          ].filter((f) => f) as ColumnFiltersState
                          setColumnFilters([...newColumnFilters])
                        }}>
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}>
                          <Check size={16} />
                        </div>
                        {option.icon && (
                          <option.icon className="mr-2 size-4 text-muted-foreground" />
                        )}
                        <span className="line-clamp-1">{option.label}</span>
                        {!!facets?.get(value) && (
                          <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                            {`${facets.get(value)}`}
                          </span>
                        )}
                      </CommandItem>
                    )
                  })}
              </CommandGroup>
            </ScrollArea>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setColumnFilters([
                        ...columnFilters.filter((c) => c.id !== column),
                      ])
                    }}
                    className="justify-center text-center">
                    모두 선택 해제
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
