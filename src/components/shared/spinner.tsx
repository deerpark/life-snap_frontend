import { Shell } from "lucide-react"

import { cn } from "@lib/utils"

/**
 * 페이지 로딩 인디케이터 컨테이너
 */
type SpinnerProps = { isFull?: boolean; size?: number; className?: string }
export function Spinner({
  isFull,
  size = 16,
  className,
}: React.HTMLProps<HTMLDivElement> & SpinnerProps) {
  const classNames = cn(
    "flex items-center justify-center",
    isFull ? "flex-1" : "",
    className
  )
  return (
    <div className={classNames}>
      <span className="animate-spin">
        <Shell
          width={size}
          height={size}
          style={{ transform: "rotateY(180deg)" }}
        />
      </span>
    </div>
  )
}
