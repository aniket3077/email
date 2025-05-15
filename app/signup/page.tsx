"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, User, Lock, CheckCircle, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import AnimatedButton from "@/components/ui/animated-button"
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Signup with:", { name, email, password, agreedToTerms })
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col relative px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
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
          <GlassmorphicCard className="p-8" glassEffect={true} rotateEffect={false}>
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-sky-700">Create your account</h1>
                <p className="text-sm text-sky-600">
                  Join thousands of businesses improving their email deliverability
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-sky-400" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-10 h-12 border-sky-200 rounded-md focus-visible:ring-sky-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-sky-400" />
                    <Input
                      id="email"
                      placeholder="you@example.com"
                      type="email"
                      className="pl-10 h-12 border-sky-200 rounded-md focus-visible:ring-sky-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-sky-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 h-12 border-sky-200 rounded-md pr-10 focus-visible:ring-sky-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 h-5 w-5 text-sky-400 hover:text-sky-600"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </button>
                  </div>
                  <p className="text-xs text-sky-500 mt-1">
                    Password must be at least 8 characters long with a number and a special character.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    disabled={isLoading}
                    className="text-sky-600 border-sky-300 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none text-sky-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-sky-600 hover:text-sky-800 underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-sky-600 hover:text-sky-800 underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <div className="pt-2">
                  <AnimatedButton
                    type="submit"
                    className="w-full h-12 font-medium bg-sky-600 hover:bg-sky-700"
                    disabled={isLoading || !agreedToTerms}
                    isLoading={isLoading}
                    loadingText="Creating account..."
                  >
                    Create account
                  </AnimatedButton>
                </div>
              </form>

              <div className="text-center">
                <p className="text-sm text-sky-600">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-sky-700 hover:text-sky-800 transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </GlassmorphicCard>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full h-[450px] flex items-center justify-center perspective-800">
              {/* 3D illustration */}
              <motion.div
                className="w-full h-full rounded-2xl flex items-center justify-center"
                animate={{ rotateY: -5, rotateX: 5 }}
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
                className="absolute -top-2 right-4 bg-white shadow-lg px-4 py-3 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Free Trial</span>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2 bg-white text-sky-600 rounded-xl shadow-lg py-2 px-4 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-sky-600" />
                  <span>GDPR Compliant</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
