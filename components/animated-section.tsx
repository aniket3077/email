"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useAnimationOnScroll } from "@/hooks/use-animation-on-scroll"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const { ref, isVisible } = useAnimationOnScroll()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
