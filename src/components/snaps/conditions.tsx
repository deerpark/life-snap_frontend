import { useLocalStore, useSessionStore } from "@store"
import { X } from "lucide-react"

import { PAGE_SIZE } from "@lib/constants"
import { ToggleButton } from "@components/shared"
import { DataCondition } from "@components/snaps/condition"
import { Button, Tip } from "@components/ui"

export function Conditions() {
  const { params } = useSessionStore(({ params }) => ({
    params,
  }))
  const {
    filterOptions: { jobs, grades, ages },
    toggle,
  } = useLocalStore(({ filterOptions, toggle }) => ({
    filterOptions,
    toggle,
  }))
  const hasParam = Object.entries(params)
    .filter(([key]) => ["age", "grade", "job"].includes(key))
    .some((p) => !!p[1])
  return (
    <>
      <ToggleButton
        toggleKey="condition"
        className="flex-none"
        arrowHorizontal
      />
      {toggle.condition ? (
        <>
          <DataCondition className="flex-none" column="job" options={jobs} />
          <DataCondition
            className="flex-none"
            column="grade"
            options={grades}
          />
          <DataCondition className="flex-none" column="age" options={ages} />
          {hasParam ? (
            <Tip content="초기화">
              <Button
                variant="ghost"
                onClick={() =>
                  useSessionStore.setState(({ params }) => ({
                    params: {
                      ...params,
                      age: undefined,
                      grade: undefined,
                      job: undefined,
                      page: 1,
                      page_size: PAGE_SIZE[1],
                    },
                  }))
                }
                className="flex items-center px-3 2xl:px-3 py-1 2xl:py-2 gap-x-1 2xl:gap-x-2 h-7 2xl:h-auto">
                <X className="size-3 2xl:size-4 text-destructive" />
              </Button>
            </Tip>
          ) : null}
        </>
      ) : null}
    </>
  )
}
