import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@src/lib/utils"

type ImageProps = {
  src: string
  alt: string
  loadingIcon?: React.ReactNode
  fallbackIcon?: React.ReactNode
  containerClassName?: string
  className?: string
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  function ImageComponent(
    {
      src,
      alt,
      loadingIcon,
      fallbackIcon,
      containerClassName,
      className,
    }: ImageProps,
    ref
  ) {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)

    const handleLoad = () => {
      setLoading(false)
    }

    const handleError = () => {
      setLoading(false)
      setError(true)
    }

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
            ref={ref}
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
