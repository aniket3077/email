"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AnimatedButton from "@/components/ui/animated-button"
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card"
import { activeApiService } from "@/lib/api-config"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!email) {
        setError("Email is required")
        return
      }

      // Call the password reset API
      if (activeApiService.auth.forgotPassword) {
        await activeApiService.auth.forgotPassword(email)
        setIsSuccess(true)
      } else {
        throw new Error("Password reset functionality not available")
      }
    } catch (error: any) {
      console.error("Password reset request failed:", error)
      
      if (error?.data?.message) {
        setError(error.data.message)
      } else if (error?.message) {
        setError(error.message)
      } else {
        setError("Password reset request failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col relative px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient with animated shapes - using sky blue theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 z-0">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-sky-300 opacity-20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-sky-400 opacity-20 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Logo header - positioned at the top left */}
      <header className="w-full relative z-10 mb-8">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              <motion.img 
                src="/images/logo.png" 
                alt="Sphurti Logo" 
                className="h-12 w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              <motion.h2 
                className="ml-3 text-2xl font-bold text-sky-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Sphurti
              </motion.h2>
            </Link>
          </motion.div>
        </div>
      </header>

      <motion.div
        className="w-full max-w-md mx-auto flex-grow flex items-center justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassmorphicCard className="p-8 w-full" glassEffect={true} rotateEffect={false}>
          <div className="space-y-6">
            {!isSuccess ? (
              <>
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl font-bold tracking-tight text-sky-700">Reset Your Password</h1>
                  <p className="text-sm text-sky-600">
                    Enter your email address and we'll send you a link to reset your password
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <motion.div 
                      className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-sky-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10 h-12 border-sky-200 rounded-md focus-visible:ring-sky-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <AnimatedButton 
                      type="submit"
                      className="w-full h-12 font-medium bg-sky-600 hover:bg-sky-700" 
                      disabled={isLoading}
                      isLoading={isLoading}
                      loadingText="Sending reset link..."
                    >
                      Reset Password
                    </AnimatedButton>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-sky-700">Check Your Email</h2>
                <p className="text-sm text-sky-600">
                  We've sent a password reset link to <strong>{email}</strong>.
                  Please check your inbox and follow the instructions to reset your password.
                </p>
                <p className="text-xs text-sky-500 mt-2">
                  If you don't see the email, check your spam folder.
                </p>
              </div>
            )}

            <div className="text-center pt-4">
              <Link 
                href="/login" 
                className="inline-flex items-center text-sm text-sky-600 hover:text-sky-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </div>
  )
} 