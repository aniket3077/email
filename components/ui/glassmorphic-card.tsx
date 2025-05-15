"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  glassEffect?: boolean
  rotateEffect?: boolean
  shadowEffect?: boolean
  hoverScale?: boolean
}

export function GlassmorphicCard({
  children,
  className = "",
  glassEffect = true, 
  rotateEffect = true,
  shadowEffect = true,
  hoverScale = true,
}: GlassmorphicCardProps) {
  // Base styles
  let baseClasses = "rounded-xl overflow-hidden"
  
  // Add glass effect if enabled
  if (glassEffect) {
    baseClasses += " bg-white/80 backdrop-blur-md border border-white/20"
  } else {
    baseClasses += " bg-white"
  }
  
  // Add shadow effects
  if (shadowEffect) {
    baseClasses += " shadow-[0_8px_30px_rgb(0,0,0,0.07)]"
  }

  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      whileHover={
        rotateEffect || hoverScale
          ? {
              y: hoverScale ? -5 : 0,
              rotateX: rotateEffect ? 5 : 0,
              rotateY: rotateEffect ? 5 : 0,
              transition: { duration: 0.2 },
              boxShadow: shadowEffect
                ? "0 20px 40px rgba(0, 0, 0, 0.1)"
                : undefined,
            }
          : undefined
      }
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <motion.div
        className="relative z-10"
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Variation with preset props for stats cards
export function StatsCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <GlassmorphicCard
      className={`p-6 ${className}`}
      glassEffect={true}
      rotateEffect={true}
      shadowEffect={true}
      hoverScale={true}
    >
      {children}
    </GlassmorphicCard>
  )
}

// Variation with preset props for feature cards
export function FeatureCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <GlassmorphicCard
      className={`p-6 h-full ${className}`}
      glassEffect={false}
      rotateEffect={true}
      shadowEffect={true}
      hoverScale={true}
    >
      {children}
    </GlassmorphicCard>
  )
}

// Variation with preset props for testimonial cards
export function TestimonialCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <GlassmorphicCard
      className={`p-8 ${className}`}
      glassEffect={true}
      rotateEffect={false}
      shadowEffect={true}
      hoverScale={true}
    >
      {children}
    </GlassmorphicCard>
  )
} 