import * as React from "react"
import { X } from "lucide-react"

import { Button } from "@src/components/ui/button"
import useRootStore from "@src/stores/root.store"
import { Image } from "@components/snaps/image"

export function ImageViewer() {
  const { imageViwerSrc } = useRootStore(({ imageViwerSrc }) => ({
    imageViwerSrc,
  }))

  const handleCloseImage = React.useCallback(() => {
    useRootStore.setState(() => ({ imageViwerSrc: null }))
  }, [])

  return imageViwerSrc ? (
    <div
      className="bg-foreground/80 backdrop-blur-sm fixed flex items-center justify-center inset-0 z-40 animate-in fade-in duration-500 ease-out"
      onClick={handleCloseImage}>
      <Image
        containerClassName="w-auto aspect-auto rounded-2xl overflow-hidden shadow-2xl"
        className="w-auto object-contain max-h-[calc(100vh-24px)] max-w-[calc(100vw-24px)]"
        src={imageViwerSrc}
        alt=""
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-6 top-6 z-50 shadow-2xl"
        onClick={handleCloseImage}>
        <X size={20} />
      </Button>
    </div>
  ) : null
}
