"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, Loader2, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AnimatedButton from "@/components/ui/animated-button"
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card"

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      if (!formData.email || !formData.password) {
        setError("Email and password are required")
        return
      }
      
      await login(formData.email, formData.password)
    } catch (error: any) {
      console.error("Login error:", error)
      
      // Handle different types of errors
      if (error?.status === 401) {
        setError("Invalid email or password")
      } else if (error?.data?.message) {
        setError(error.data.message)
      } else if (error?.message) {
        setError(error.message)
      } else {
        setError("Login failed. Please try again.")
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col relative px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient with animated shapes - using a lighter blue theme */}
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
        className="w-full max-w-5xl mx-auto flex-grow flex items-center justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full h-[400px] flex items-center justify-center perspective-800">
              {/* 3D illustration */}
              <motion.div
                className="w-full h-full rounded-2xl flex items-center justify-center"
                animate={{ rotateY: 5, rotateX: 5 }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut" 
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src="/images/illustration.png"
                  alt="Email Verification"
                  className="max-w-full h-auto rounded-2xl shadow-xl"
                  style={{ transform: "translateZ(40px)" }}
                />
              </motion.div>
              
              <motion.div
                className="absolute bottom-4 left-4 bg-white text-sky-600 rounded-xl shadow-lg py-2 px-4 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Secure Login</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <GlassmorphicCard className="p-8" glassEffect={true} rotateEffect={false}>
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-sky-700">Sign in to your account</h1>
                <p className="text-sm text-sky-600">
                  Enter your credentials to access your dashboard
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
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-sky-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 h-12 border-sky-200 rounded-md focus-visible:ring-sky-500"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-sky-600 hover:text-sky-500 font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-sky-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 border-sky-200 rounded-md focus-visible:ring-sky-500"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <AnimatedButton 
                    type="submit"
                    className="w-full h-12 font-medium bg-sky-600 hover:bg-sky-700" 
                    disabled={isLoading}
                    isLoading={isLoading}
                    loadingText="Signing in..."
                  >
                    Sign in
                  </AnimatedButton>
                </div>
              </form>

              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-sky-600">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-medium text-sky-700 hover:text-sky-800 transition-colors">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>

              {/* Development helper for test credentials */}
              <div className="mt-4 p-3 bg-sky-50 border border-sky-100 rounded-md">
                <h3 className="text-sm font-medium text-sky-800 mb-1">Test Credentials:</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-sky-700">
                  <div>
                    <p className="font-semibold">Regular User:</p>
                    <p>Email: test@example.com</p>
                    <p>Password: test1234</p>
                  </div>
                  <div>
                    <p className="font-semibold">Admin User:</p>
                    <p>Email: admin@example.com</p>
                    <p>Password: admin1234</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        </div>
      </motion.div>
    </div>
  )
}
