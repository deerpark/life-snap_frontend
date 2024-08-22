import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@lib/utils"

type ImageProps = {
  src: string
  alt: string
  loadingIcon?: React.ReactNode
  fallbackIcon?: React.ReactNode
  containerClassName?: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLImageElement>
  setDimensions?: React.Dispatch<
    React.SetStateAction<{
      width: number
      height: number
    } | null>
  >
}

export const Image = React.forwardRef<HTMLImageElement | null, ImageProps>(
  function ImageComponent(
    {
      src,
      alt,
      loadingIcon,
      fallbackIcon,
      containerClassName,
      className,
      onClick,
      setDimensions,
      ...props
    }: ImageProps,
    ref
  ) {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const imgRef = React.useRef<HTMLImageElement | null>(null)

    const handleLoad = () => {
      setLoading(false)
      if (!imgRef.current) return
      const { naturalWidth, naturalHeight } = imgRef.current
      setDimensions &&
        setDimensions({ width: naturalWidth, height: naturalHeight })
    }

    const handleError = () => {
      setLoading(false)
      setError(true)
    }

    React.useImperativeHandle<HTMLImageElement | null, HTMLImageElement | null>(
      ref,
      () => imgRef.current,
      []
    )

    return (
      <div
        className={cn(
          "relative w-full aspect-video bg-accent/20",
          containerClassName
        )}>
        {loading && !error && loadingIcon && (
          <div className="absolute inset-0 flex items-center justify-center">
            {loadingIcon}
          </div>
        )}
        {!error ? (
          <motion.img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0 }}
            animate={{
              opacity: loading ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={cn("w-full object-cover", className)}
            style={loading ? { display: "none" } : {}}
            onClick={onClick}
            {...props}
          />
        ) : fallbackIcon ? (
          <div className="absolute inset-0 flex items-center justify-center">
            {fallbackIcon}
          </div>
        ) : null}
      </div>
    )
  }
)
