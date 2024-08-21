import { ColumnDef } from "@tanstack/react-table"
import { format, getDay, parse } from "date-fns"

import { Snap } from "@type/index"
import { GRADE } from "@src/lib/enum"
import { cn } from "@src/lib/utils"
import {
  DATE_FORMAT,
  DAY_NAME,
  GRADE_COLOR,
  PROPERTY_LABEL,
  YEAR,
} from "@lib/constants"
import { DataTableColumnHeader } from "@components/snaps/column-header"

export const columns: ColumnDef<Snap>[] = [
  /* {
    accessorKey: "file_name",
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
      return (
        <Card
          className={
            "group relative rounded-2xl overflow-hidden h-8 w-8 shadow-none"
          }>
          <Image
            src={`${env.VITE_API_BASE_URL}/api/image/${row.getValue("file_name")}`}
            loadingIcon={
              <Shell
                className="animate-spin text-muted-foreground/50"
                size={24}
              />
            }
            fallbackIcon={
              <Aperture className="text-muted-foreground/50" size={24} />
            }
            alt=""
          />
        </Card>
      )
    },
    enableSorting: false,
    enableHiding: true,
  }, */
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
      return <div className="">{row.getValue("tpo")}</div>
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
      return <div className="">{row.getValue("job")}</div>
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
        title=""
        className="text-left pl-2"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
          {(row.getValue("option_values") as string | undefined)
            ?.split(",")
            .map((val, i) => (
              <span
                key={`${val}-${i}`}
                className="border rounded-[4px] px-1 text-sm bg-muted">
                {val}
              </span>
            ))}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
  },
]
