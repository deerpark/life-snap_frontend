import { useInfiniteScroll } from "@hook"
import { Bomb, BoxSelect, CheckCheck, Ellipsis } from "lucide-react"

import { cn } from "@lib/utils"
import { Empty, Spinner } from "@components/shared"

interface InfiniteLoadProps {
  isEmpty?: boolean
}

export function InfiniteLoad({ isEmpty }: InfiniteLoadProps) {
  const { observerRef, status, error, hasNextPage } = useInfiniteScroll()

  if (status === "loading")
    return (
      <div
        className={cn(
          "min-h-40 flex flex-col justify-center items-center text-muted-foreground",
          isEmpty ? "flex-1 h-full" : ""
        )}>
        <Spinner size={16} />
      </div>
    )

  if (status === "error")
    return (
      <div
        className={cn(
          "flex-1 flex flex-col justify-center items-center text-muted-foreground",
          isEmpty ? "flex-1 h-full" : "min-h-40"
        )}>
        <Empty
          className="flex-1"
          icon={<Bomb size={32} className="text-foreground/70" />}
          title="문제가 발생했습니다"
          description={(error as Error).message}
        />
      </div>
    )

  if (hasNextPage)
    return (
      <div
        ref={observerRef}
        className="animate-pulse min-h-40 flex flex-col justify-center items-center text-muted-foreground bg-gradient-to-b from-background via-75% via-background to-muted">
        <Ellipsis size={32} />
      </div>
    )

  if (isEmpty)
    return (
      <Empty
        className="flex-1 !py-36"
        icon={
          <BoxSelect
            size={48}
            strokeWidth={1.5}
            className="text-foreground/70"
          />
        }
        title="스냅이 존재하지 않습니다."
        description="검색 조건을 변경하거나 관리자에게 스냅등록을 요청 해 주세요"
      />
    )
  return (
    <Empty
      className="min-h-40"
      icon={
        <CheckCheck
          size={48}
          strokeWidth={1.5}
          className="text-muted-foreground"
        />
      }
      description="데이터를 모두 불러왔습니다."
    />
  )
}
