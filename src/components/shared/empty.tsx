import { cn } from "@src/lib/utils"

type EmptyProps = {
  /** 아이콘 */
  icon?: JSX.Element
  /** 제목 */
  title?: string
  /** 설명 */
  description?: React.ReactNode
  /** 제목 CSS 클래스 */
  titleClassName?: string
  /** 설명 CSS 클래스 */
  descriptionClassName?: string
}

/** 비어있는 컨텐츠에 대한 폴백을 제공한다 */
export default function Empty({
  icon,
  title,
  description,
  children,
  className,
  titleClassName,
  descriptionClassName,
  ...props
}: React.HTMLProps<HTMLDivElement> & EmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center flex-1 py-10 sm:py-5 xl:py-10 gap-y-3 justify-center",
        className
      )}
      {...props}>
      {icon && <div className="text-foreground pb-4">{icon}</div>}
      <div className="flex flex-col items-center gap-y-2">
        {title && (
          <h2
            className={cn(
              "text-center text-xl text-muted-foreground",
              titleClassName
            )}>
            {title}
          </h2>
        )}
        {description && (
          <p
            className={cn(
              "leading-6 text-center text-md text-muted-foreground/50",
              descriptionClassName
            )}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
