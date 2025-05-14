"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Don't show navbar on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <motion.img
              src="/images/logo.png"
              alt="EmailVerify Logo"
              className="h-8 w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <span className="ml-2 text-lg font-semibold">EmailVerify</span>
          </Link>

          <nav className="hidden md:flex ml-10 space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
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
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <img src="/images/logo.png" alt="EmailVerify Logo" className="h-8 w-auto" />
                  <span className="ml-2 text-lg font-semibold">EmailVerify</span>
                </Link>
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
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t space-y-2">
                  {isAuthenticated ? (
                    <Button className="w-full" asChild>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        Dashboard
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          Sign in
                        </Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>
                          Sign up
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
