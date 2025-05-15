"use client"

import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Users,
  ListChecks,
  CreditCard,
  Settings,
  HelpCircle,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Loader2,
  ShoppingBag,
  Tag,
  Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading, logout, isAuthenticated } = useAuth()
  const [subMenuStates, setSubMenuStates] = useState<{ [key: string]: boolean }>({})

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Redirect to login if not authenticated and not loading or not admin
  useEffect(() => {
    if (!isLoading) {
      // Only redirect if not authenticated
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }
      
      // If authenticated but not admin, redirect to dashboard
      if (user && user.role !== "admin") {
        router.push("/dashboard");
      }
      // If the user is authenticated and is an admin, do nothing (stay on the admin page)
    }
  }, [isLoading, isAuthenticated, router, user])

  // If still loading, show a loading screen
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-2 text-sm text-gray-500">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/email-lists", label: "Email Lists", icon: ListChecks },
    { href: "/admin/email-verification", label: "Email Verification", icon: Check },
    { href: "/admin/credits", label: "Credit Management", icon: CreditCard },
    { href: "/admin/subscriptions", label: "Subscriptions", icon: ShoppingBag },
    { href: "/admin/coupons", label: "Coupons", icon: Tag },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <motion.aside
        className={`hidden md:flex flex-col bg-white border-r shadow-sm transition-all duration-300 ${
          isCollapsed ? "md:w-20" : "md:w-64"
        }`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1, width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Link href="/admin" className="flex items-center">
            <motion.img
              src="/images/logo.png"
              alt="Admin Panel"
              className="h-8 w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            {!isCollapsed && <span className="ml-2 text-lg font-semibold">Admin Panel</span>}
          </Link>
          <Button variant="ghost" size="sm" className="p-1" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="p-2 space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <div key={item.href} className="relative">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.label}</span>}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r"
                          layoutId="activeNavIndicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                </div>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t mt-auto">
          <Button variant="destructive" size="sm" className="w-full" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" 
           style={{ display: isMobileMenuOpen ? "block" : "none" }} 
           onClick={() => setIsMobileMenuOpen(false)} />

      <motion.aside
        className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg"
        initial={{ x: "-100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Link href="/admin" className="flex items-center">
            <img src="/images/logo.png" alt="Admin Panel" className="h-8 w-auto" />
            <span className="ml-2 text-lg font-semibold">Admin Panel</span>
          </Link>
          <Button variant="ghost" size="sm" className="p-1" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="overflow-y-auto h-full">
          <nav className="p-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <div key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {isActive && <div className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r" />}
                  </Link>
                </div>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t mt-auto">
          <Button variant="destructive" size="sm" className="w-full" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="md:hidden mr-2" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>

            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    { title: "New user registered", time: "5 min ago" },
                    { title: "New subscription purchased", time: "1 hour ago" },
                    { title: "System update completed", time: "1 day ago" },
                  ].map((notification, index) => (
                    <DropdownMenuItem key={index} className="cursor-pointer">
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium">{notification.title}</span>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photoUrl} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {user?.name?.charAt(0).toUpperCase() || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 