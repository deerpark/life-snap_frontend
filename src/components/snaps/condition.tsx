/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { FacetedOption, GetSnapsParams, Snap } from "@interface"
import { useSessionStore } from "@store"
import { ColumnFilter } from "@tanstack/react-table"
import { Check, ChevronDown, ChevronUp, CirclePlus } from "lucide-react"

import { PAGE_SIZE, PROPERTY_LABEL } from "@lib/constants"
import { KEY } from "@lib/enum"
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

interface DataConditionProps {
  column: keyof Snap
  options: FacetedOption[]
  className?: string
}

export function DataCondition({
  column,
  options,
  className,
}: DataConditionProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { params } = useSessionStore(({ params }) => ({
    params,
  }))
  const title = PROPERTY_LABEL[column]

  const columnFilter = React.useMemo(
    () =>
      ({
        id: column,
        value:
          params[
            column as keyof Pick<GetSnapsParams, "age" | "grade" | "job">
          ]?.split(",") || [],
      }) as ColumnFilter,
    [params, column]
  )

  const selectedValues = React.useMemo(
    () =>
      (columnFilter.value as string[])?.length
        ? new Set((columnFilter.value as string[]).map((v) => `${v}`))
        : new Set(),
    [column, columnFilter.value]
  )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
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
                        className="rounded-sm px-1 font-normal">
                        {option.label}
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
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>{title} 데이터가 존재하지 않습니다.</CommandEmpty>
            <ScrollArea className="flex flex-col justify-stretch max-h-[300px]">
              <CommandGroup>
                {options.map((option) => {
                  const value = `${option.value}`
                  const isSelected = selectedValues.has(value)
                  return (
                    <CommandItem
                      key={value}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(value)
                        } else {
                          selectedValues.add(value)
                        }
                        const filterValues = Array.from(selectedValues)
                        const newParams = {
                          ...params,
                          page: 1,
                          [column]: selectedValues.size
                            ? filterValues.join(",")
                            : undefined,
                        }
                        useSessionStore.setState(() => ({
                          params: newParams,
                        }))
                        sessionStorage.setItem(KEY.SEED, "null")
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
                      <span>{option.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </ScrollArea>
            {selectedValues.size > 0 ? (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      useSessionStore.setState(() => ({
                        params: {
                          ...params,
                          page: 1,
                          page_size: PAGE_SIZE[1],
                          [column]: undefined,
                        },
                      }))
                      sessionStorage.setItem(KEY.SEED, "null")
                    }}
                    className="justify-center text-center">
                    모두 선택 해제
                  </CommandItem>
                </CommandGroup>
              </>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
