"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LoadingSpinner } from "./loading-spinner"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  isLoading?: boolean
  loadingText?: string
  asChild?: boolean
}

export default function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  loadingText,
  asChild = false,
}: AnimatedButtonProps) {
  const isPrimary = variant === "default" || variant === "destructive"
  const spinnerColor = isPrimary ? "white" : "primary"

  return (
    <motion.div
      whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        className={cn(className)}
        variant={variant}
        size={size}
        onClick={onClick}
        type={type}
        disabled={disabled || isLoading}
        asChild={asChild}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" color={spinnerColor} className="mr-2" />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </Button>
    </motion.div>
  )
}
