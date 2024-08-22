import * as React from "react"
import { Snap } from "@interface"
import { useRootStore } from "@store"
import { ColumnDef } from "@tanstack/react-table"
import { format, getDay, parse } from "date-fns"
import { Aperture, Shell } from "lucide-react"

import { env } from "@env"
import {
  DATE_FORMAT,
  DAY_NAME,
  GRADE_COLOR,
  PROPERTY_LABEL,
  YEAR,
} from "@lib/constants"
import { GRADE } from "@lib/enum"
import { cn } from "@lib/utils"
import { DataTableColumnHeader, Image } from "@components/snaps"
import { Card } from "@components/ui"

export const columns: ColumnDef<Snap>[] = [
  {
    accessorKey: "snap_id",
    meta: {},
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#" className="" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-semibold text-xs whitespace-nowrap text-center">
          {row.getValue("snap_id")}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "file_name",
    meta: {
      enableFaceted: false,
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이미지" className="" />
    ),
    cell: ({ row }) => {
      const handleExposeImage: React.MouseEventHandler<HTMLImageElement> = (
        e
      ) => {
        e.stopPropagation()
        const imageSrc = e.currentTarget.dataset.src
        if (!imageSrc) return
        useRootStore.setState(() => ({ imageViwerSrc: imageSrc }))
      }
      return (
        <Card
          className={
            "group w-8 h-10 relative rounded-[8px] overflow-hidden -my-4 mx-auto shadow-none"
          }>
          <Image
            containerClassName="w-8 h-10 aspect-auto cursor-pointer"
            data-src={`${env.VITE_API_BASE_URL}/api/image/${row.getValue("file_name")}`}
            className="w-8 h-10"
            src={`${env.VITE_API_BASE_URL}/api/image/${row.getValue("file_name")}`}
            loadingIcon={
              <span className="animate-spin text-muted-foreground/50">
                <Shell size={16} style={{ transform: "rotateY(180deg)" }} />
              </span>
            }
            fallbackIcon={
              <Aperture className="text-muted-foreground/50" size={24} />
            }
            alt=""
            onClick={handleExposeImage}
          />
        </Card>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tpo",
    meta: {},
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={PROPERTY_LABEL[column.id as keyof Snap]}
        className="text-left pl-2"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-bold whitespace-nowrap">{row.getValue("tpo")}</div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image_date",
    meta: {
      enableFaceted: false,
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={PROPERTY_LABEL[column.id as keyof Snap]}
        className="text-left pl-2"
      />
    ),
    cell: ({ row }) => {
      const dateStr = `${row.getValue("image_date")}`
      const date = parse(dateStr, DATE_FORMAT.DATE_MINI, new Date())
      const dayName = DAY_NAME[getDay(date)]
      const formattedDate = format(date, "MM. dd.") + `(${dayName}) `
      return (
        <div className="flex items-center gap-x-1 max-w-48">
          <span className="flex-none text-xs text-muted-foreground">
            {formattedDate}
          </span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "birth_year",
    meta: {},
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={PROPERTY_LABEL[column.id as keyof Snap]}
        className="text-left pl-2"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center font-semibold">
          {YEAR - Number(row.getValue("birth_year"))}
          <span className="text-muted-foreground font-normal">세</span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, columnId, filterValue) => {
      return filterValue
        .map((v: string) => Number(v))
        .includes(Number(row.getValue(columnId)))
    },
  },
  {
    accessorKey: "grade",
    meta: {},
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={PROPERTY_LABEL[column.id as keyof Snap]}
        className="text-left pl-2"
      />
    ),
    cell: ({ row }) => {
      return (
        <span
          className={cn(
            "font-bold rounded text-xs px-0.5",
            GRADE_COLOR.BADGE[row.getValue("grade") as GRADE] ||
              GRADE_COLOR.BADGE.DEFAULT
          )}>
          {row.getValue("grade")}
        </span>
      )
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, columnId, filterValue) => {
      return filterValue?.includes(row.getValue(columnId))
    },
  },
  {
    accessorKey: "job",
    meta: {},
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={PROPERTY_LABEL[column.id as keyof Snap]}
        className="text-left pl-2"
      />
    ),
    cell: ({ row }) => {
      return <div className="whitespace-nowrap">{row.getValue("job")}</div>
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, columnId, filterValue) => {
      return filterValue?.includes(row.getValue(columnId))
    },
  },
  {
    accessorKey: "city",
    meta: {},
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={PROPERTY_LABEL[column.id as keyof Snap]}
        className="text-left pl-2"
      />
    ),
    cell: ({ row }) => {
      return <div className="">{row.getValue("city")}</div>
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, columnId, filterValue) => {
      return filterValue?.includes(row.getValue(columnId))
    },
  },
  {
    accessorKey: "option_values",
    meta: {},
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={PROPERTY_LABEL[column.id as keyof Snap]}
        className="text-left pl-2"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-3">
          {(row.getValue("option_values") as string | undefined)
            ?.split(",")
            .map((val, i) => (
              <span
                key={`${val}-${i}`}
                className="min-w-48 flex items-center gap-x-1">
                <span className="text-xs text-muted-foreground/70 whitespace-nowrap">
                  {
                    ((row.original.options as string | undefined)?.split(",") ||
                      [])[i]
                  }
                </span>
                <span className="border rounded-[4px] px-1 text-sm bg-muted whitespace-nowrap">
                  {val}
                </span>
              </span>
            ))}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
  },
]
