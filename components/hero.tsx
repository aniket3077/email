"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedButton from "@/components/ui/animated-button"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Protect your email reputation!
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Verify your email lists with our powerful service to improve deliverability and protect your sender
                reputation.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <AnimatedButton size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg" asChild>
                <Link href="#features">Learn More</Link>
              </AnimatedButton>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center bg-blue-100 rounded-full">
              <Mail className="w-32 h-32 text-blue-600" />
              <motion.div
                className="absolute -top-4 -right-4 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                +3
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
