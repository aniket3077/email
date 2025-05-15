"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg"
  textColor?: string
  onClick?: () => void
  href?: string
}

export default function AnimatedLogo({
  size = "md",
  textColor = "text-gray-900",
  onClick,
  href = "/",
}: AnimatedLogoProps) {
  const sizes = {
    sm: {
      icon: "h-6 w-6",
      text: "text-lg",
      container: "gap-1.5",
    },
    md: {
      icon: "h-8 w-8",
      text: "text-xl",
      container: "gap-2",
    },
    lg: {
      icon: "h-10 w-10",
      text: "text-2xl",
      container: "gap-3",
    },
  }

  const logoContent = (
    <div
      className={`flex items-center ${sizes[size].container} cursor-pointer`}
      onClick={onClick}
    >
      <div className="relative">
        <motion.div
          className={`${sizes[size].icon} flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-md`}
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white p-1.5"
          >
            <path
              d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 bg-green-500 h-3 w-3 rounded-full border border-white"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </div>
      <motion.div
        className={`font-bold ${sizes[size].text} ${textColor}`}
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <span>Email</span>
        <motion.span
          className="text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          Verify
        </motion.span>
      </motion.div>
    </div>
  )

  if (href) {
    return <Link href={href}>{logoContent}</Link>
  }

  return logoContent
} 