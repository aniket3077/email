"use client"

import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  List,
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
  User,
  Package,
  History,
  CheckCircle,
  MailCheck,
  Code,
  Link as LinkIcon,
  GraduationCap,
  Plus
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

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading, logout, isAuthenticated } = useAuth()

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Redirect to login if not authenticated and not loading
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // If still loading, show a loading screen
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-2 text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/verification/new", label: "Email Verification", icon: MailCheck },
    { href: "/dashboard/verifications", label: "My Verifications", icon: CheckCircle },
    { href: "/dashboard/lists", label: "Email Lists", icon: List },
    { href: "/dashboard/credits", label: "Credits", icon: CreditCard },
    { href: "/dashboard/history", label: "History", icon: History },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  // Animation variants
  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 80 },
  }

  const navItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    hover: { 
      backgroundColor: "#f3f4f6", 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  }

  const mobileMenuVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden md:flex flex-col bg-white border-r shadow-sm"
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <motion.div className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="/images/logo-v1.svg"
                alt="Sphurti"
                className="h-8 w-auto object-contain"
                width={150}
                height={40}
              />
              <span className="ml-2 font-semibold text-gray-800">Sphurti</span>
            </motion.div>
          </Link>
          <Button variant="ghost" size="sm" className="p-1" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 py-6 overflow-hidden flex flex-col">
          <nav className="flex flex-col h-full flex-nowrap overflow-hidden px-4">
            <div className="space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <motion.div 
                    key={item.href} 
                    className="relative"
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{ backgroundColor: "#f0faf9", scale: 1.02 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                        isActive
                          ? "bg-[#e6f7ff] text-[#0ea5e9] font-medium"
                          : "text-gray-600 hover:text-[#0ea5e9]"
                      }`}
                    >
                      <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-[#0ea5e9]" : "text-gray-500"}`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 w-1 h-10 bg-[#0ea5e9] rounded-r"
                          layoutId="activeNavIndicator"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </nav>

          <div className="mt-auto px-4">
            <div className="py-4 border-t mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-medium">Credits:</span>
                <span className="font-bold">{user?.credits || 0}</span>
              </div>
              <Link href="/dashboard/credits/buy" passHref>
                <Button className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white gap-2 py-5">
                  <Plus className="h-4 w-4" />
                  <span>Buy Credits</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 border-t mt-auto">
          <Button variant="destructive" size="sm" className="w-full" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.aside
        className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg"
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <img 
              src="/images/logo-v1.svg" 
              alt="Sphurti" 
              className="h-8 w-auto object-contain" 
              width={150}
              height={40}
            />
            <span className="ml-2 text-lg font-semibold">Sphurti</span>
          </Link>
          <Button variant="ghost" size="sm" className="p-1" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="h-[calc(100%-8rem)] flex flex-col overflow-hidden py-2">
          <nav className="flex flex-col h-full justify-between overflow-hidden">
            <div className="space-y-1 px-2">
              {navItems.slice(0, 5).map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <motion.div 
                    key={item.href} 
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ backgroundColor: "#f3f4f6", scale: 1.02 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                        isActive
                          ? "bg-[#e6f7ff] text-[#0ea5e9] font-medium"
                          : "text-gray-600 hover:text-[#0ea5e9]"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? "text-[#0ea5e9]" : "text-gray-500"}`} />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div 
                          className="absolute left-0 w-1 h-10 bg-[#0ea5e9] rounded-r"
                          layoutId="mobileActiveNavIndicator"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
            
            <div className="space-y-1 px-2">
              {navItems.slice(5).map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <motion.div 
                    key={item.href} 
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 5) * 0.05, duration: 0.2 }}
                    whileHover={{ backgroundColor: "#f3f4f6", scale: 1.02 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                        isActive
                          ? "bg-[#e6f7ff] text-[#0ea5e9] font-medium"
                          : "text-gray-600 hover:text-[#0ea5e9]"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? "text-[#0ea5e9]" : "text-gray-500"}`} />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div 
                          className="absolute left-0 w-1 h-10 bg-[#0ea5e9] rounded-r"
                          layoutId="mobileActiveNavIndicator"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </nav>

          <div className="mt-auto px-4">
            <div className="py-4 border-t mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-medium">Credits:</span>
                <span className="font-bold">{user?.credits || 0}</span>
              </div>
              <Link href="/dashboard/credits/buy" passHref>
                <Button className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white gap-2 py-5">
                  <Plus className="h-4 w-4" />
                  <span>Buy Credits</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <Button variant="destructive" size="sm" className="w-full" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="md:hidden mr-2" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <motion.h1 
                className="text-xl font-semibold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {pathname === "/dashboard" ? "Dashboard" : navItems.find(item => item.href === pathname)?.label || "Dashboard"}
              </motion.h1>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center gap-2 bg-gray-100/80 rounded-md p-1 mr-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/dashboard/help" passHref legacyBehavior>
                    <Button variant="ghost" size="sm" className="rounded-md h-8 px-3 text-gray-600 hover:text-blue-600 hover:bg-white">
                      <HelpCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Help</span>
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/dashboard/settings" legacyBehavior passHref>
                    <Button variant="ghost" size="sm" className="rounded-md h-8 px-3 text-gray-600 hover:text-blue-600 hover:bg-white">
                      <Settings className="h-4 w-4 mr-1" />
                      <span className="text-sm">Settings</span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
              
              <div className="hidden md:flex items-center bg-blue-50 rounded-full px-3 py-1.5 text-blue-600 text-sm mr-2">
                <CreditCard className="h-4 w-4 mr-1.5" />
                <span className="font-medium">{user?.credits || 0} Credits</span>
                <Link href="/dashboard/credits/buy" passHref>
                  <Button variant="ghost" size="sm" className="h-6 ml-2 px-2 py-0 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                    Buy More
                  </Button>
                </Link>
              </div>
            
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative group">
                    <Bell className="h-5 w-5 group-hover:text-blue-600 transition-colors" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                      2
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-2 rounded-xl">
                  <DropdownMenuLabel className="flex justify-between items-center px-2 py-2">
                    <span className="font-semibold text-md">Notifications</span>
                    <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-auto hover:bg-gray-100 hover:text-blue-600">
                      Mark all as read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="bg-green-100 text-green-600 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">Verification completed</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">Low credit balance</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </DropdownMenuItem>
                  <div className="mt-2 pt-2 border-t text-center">
                    <Link href="#" className="text-xs text-blue-600 hover:text-blue-800 hover:underline">
                      View all notifications
                    </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    <Avatar className="h-8 w-8 border border-gray-200">
                      <AvatarImage src={user?.photoUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium leading-none">{user?.name || "User"}</span>
                      <span className="text-xs text-gray-500 leading-none mt-1">User Account</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
                  <div className="flex flex-col p-2 gap-1">
                    <p className="text-sm font-medium">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="py-1">
                    <DropdownMenuItem asChild className="flex items-center gap-2 p-2 rounded-lg cursor-pointer">
                      <Link href="/dashboard/profile">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="flex items-center gap-2 p-2 rounded-lg cursor-pointer">
                      <Link href="/dashboard/settings">
                        <Settings className="h-4 w-4 mr-2 text-gray-500" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="flex items-center gap-2 p-2 rounded-lg cursor-pointer">
                      <Link href="/dashboard/subscription">
                        <Package className="h-4 w-4 mr-2 text-gray-500" />
                        Subscription
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="flex items-center gap-2 p-2 rounded-lg cursor-pointer">
                      <Link href="/dashboard/help">
                        <HelpCircle className="h-4 w-4 mr-2 text-gray-500" />
                        Help & Support
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 p-2 text-red-600 rounded-lg cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
