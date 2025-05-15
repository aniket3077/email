"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedLogo from "@/components/ui/animated-logo"
import { useAuth } from "@/contexts/auth-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't show navbar on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
  ]

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${isScrolled ? 'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm' : 'bg-transparent'}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <AnimatedLogo size="md" />

          <nav className="hidden md:flex ml-10 space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                <motion.div
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    pathname === item.href
                      ? "bg-sky-50 text-sky-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-sky-50"
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <Button asChild className="rounded-full px-5" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild className="rounded-full">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild className="rounded-full bg-sky-600 hover:bg-sky-700">
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <AnimatedLogo size="sm" />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        pathname === item.href
                          ? "bg-sky-50 text-sky-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t space-y-2">
                  {isAuthenticated ? (
                    <Button className="w-full rounded-full bg-sky-600 hover:bg-sky-700" asChild>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        Dashboard
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full rounded-full" asChild>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          Sign in
                        </Link>
                      </Button>
                      <Button className="w-full rounded-full bg-sky-600 hover:bg-sky-700" asChild>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
