"use client"

import { useEffect, useState, useRef } from "react"

interface UseAnimationOnScrollProps {
  threshold?: number
  rootMargin?: string
}

export function useAnimationOnScroll({ threshold = 0.1, rootMargin = "0px" }: UseAnimationOnScrollProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once the animation has been triggered, we can disconnect the observer
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return { ref, isVisible }
}
