"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, CheckCircle, Shield } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedButton from "@/components/ui/animated-button"

export default function Hero() {
  // Navigation items
  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "/contact", label: "Contact Us" },
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign Up", isButton: true }
  ];

  return (
    <>
      {/* Header with logo on left and navigation menu */}
      <header className="w-full bg-white/70 backdrop-blur-sm py-4 sticky top-0 z-20">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center">
              <motion.div
                className="relative h-10 w-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image 
                  src="/images/logo.png" 
                  alt="Sphurti Logo"
                  fill
                  sizes="(max-width: 768px) 40px, 40px"
                  className="object-contain"
                  priority
                />
              </motion.div>
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

          {/* Navigation menu */}
          <motion.nav 
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {navItems.map((item, index) => (
              item.isButton ? (
                <AnimatedButton 
                  key={item.label}
                  asChild 
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  <Link href={item.href}>
                    {item.label}
                  </Link>
                </AnimatedButton>
              ) : (
                <Link 
                  key={item.label}
                  href={item.href}
                  className="text-sky-700 hover:text-sky-900 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </motion.nav>

          {/* Mobile menu button (hidden on desktop) */}
          <motion.button
            className="p-2 md:hidden text-sky-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </motion.button>
        </div>
      </header>
    
      <section className="w-full py-6 md:py-12 lg:py-16 overflow-hidden relative">
        {/* Background gradient with animated shapes - sky blue theme */}
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

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800 mb-2 border border-sky-200 max-w-max"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <CheckCircle className="mr-1 h-3.5 w-3.5" /> Trusted by 10,000+ businesses
              </motion.div>
              
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600">
                  Protect your email reputation with confidence
                </h1>
                <p className="max-w-[600px] text-sky-800 md:text-xl/relaxed">
                  Our advanced verification system helps you maintain clean email lists, improve deliverability, and protect your sender reputation.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <AnimatedButton size="lg" asChild className="bg-sky-600 hover:bg-sky-700 shadow-lg">
                  <Link href="/signup">Get Started Free</Link>
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg" asChild className="border-sky-300 text-sky-700 hover:bg-sky-50">
                  <Link href="#features">See How It Works</Link>
                </AnimatedButton>
              </div>
              
              <motion.div 
                className="flex items-center gap-4 mt-6 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-sky-700">No credit card required</span>
                </div>
                <div className="flex items-center">
                  <Shield className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-sky-700">GDPR Compliant</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
            >
              <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] flex items-center justify-center perspective-800">
                {/* 3D rotating mail icon */}
                <motion.div
                  className="w-full h-full rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-center"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="bg-gradient-to-br from-sky-500 to-blue-600 w-44 h-44 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Mail className="w-24 h-24 text-white" />
                  </motion.div>
                </motion.div>
                
                {/* Animated badges */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full shadow-lg p-3 flex items-center justify-center text-sm font-medium"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <CheckCircle className="h-5 w-5" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-2 -left-2 bg-sky-600 text-white rounded-xl shadow-lg py-1 px-3 text-sm font-medium"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  99.8% Accuracy
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
