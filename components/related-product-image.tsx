"use client"

import { useState } from "react"

interface RelatedProductImageProps {
  src: string
  alt: string
  className?: string
}

export function RelatedProductImage({ src, alt, className }: RelatedProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc("/placeholder.svg")
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  )
}

