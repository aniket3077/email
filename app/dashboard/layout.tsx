"use client"

import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  List,
  CheckCircle,
  CreditCard,
  History,
  HelpCircle,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
  ChevronRight,
  Loader2,
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
  const [subMenuStates, setSubMenuStates] = useState<{ [key: string]: boolean }>({})

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Redirect to login if not authenticated and not loading
  useEffect(() => {
    if (!isLoading && !isAuthenticated && typeof window !== "undefined") {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // If still loading, show a loading screen
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-2 text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    {
      href: "/dashboard/verification",
      label: "Email Verification",
      icon: CheckCircle,
      subItems: [
        { href: "/dashboard/verification/new", label: "New Verification" },
        { href: "/dashboard/verification/results", label: "Results" },
        { href: "/dashboard/verification/bulk", label: "Bulk Upload" },
      ],
    },
    { href: "/dashboard/lists", label: "Email Lists", icon: List },
    { href: "/dashboard/history", label: "History", icon: History },
    { href: "/dashboard/credits", label: "Credits", icon: CreditCard },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/help", label: "Help & Support", icon: HelpCircle },
  ]

  const notifications = [
    {
      id: 1,
      title: "Verification Complete",
      message: "Your email verification job has completed",
      time: "5 min ago",
      read: false,
    },
    { id: 2, title: "Credits Low", message: "Your credit balance is running low", time: "1 hour ago", read: false },
    {
      id: 3,
      title: "Welcome to EmailVerify",
      message: "Get started with your first verification",
      time: "1 day ago",
      read: true,
    },
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
          <Link href="/dashboard" className="flex items-center">
            <motion.img
              src="/images/logo.png"
              alt="EmailVerify Logo"
              className="h-8 w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            {!isCollapsed && <span className="ml-2 text-lg font-semibold">EmailVerify</span>}
          </Link>
          <Button variant="ghost" size="sm" className="p-1" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="p-2 space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href || (item.subItems && item.subItems.some((subItem) => pathname === subItem.href))
              const isSubMenuOpen = subMenuStates[item.href] || false

              return (
                <div key={item.href} className="relative">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {item.subItems ? (
                      <button
                        onClick={() =>
                          setSubMenuStates((prevState) => ({
                            ...prevState,
                            [item.href]: !isSubMenuOpen,
                          }))
                        }
                        className={`flex items-center justify-between w-full rounded-lg px-3 py-2 transition-all ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          {!isCollapsed && <span>{item.label}</span>}
                        </div>
                        {!isCollapsed && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isSubMenuOpen ? "transform rotate-180" : ""}`}
                          />
                        )}
                      </button>
                    ) : (
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
                    )}
                  </motion.div>

                  {/* Submenu */}
                  {!isCollapsed && item.subItems && (
                    <AnimatePresence>
                      {isSubMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-9 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.subItems.map((subItem) => {
                            const isSubActive = pathname === subItem.href
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`block rounded-lg px-3 py-1.5 text-sm transition-all ${
                                  isSubActive
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                              >
                                {subItem.label}
                                {isSubActive && (
                                  <motion.div
                                    className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r"
                                    layoutId="activeSubNavIndicator"
                                  />
                                )}
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Credits</span>
            <span className="text-sm font-bold">{user?.credits?.toLocaleString() || 0}</span>
          </div>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/dashboard/credits/buy">Buy Credits</Link>
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.nav
              className="absolute top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 border-b flex justify-between items-center">
                <Link href="/dashboard" className="flex items-center">
                  <img src="/images/logo.png" alt="EmailVerify Logo" className="h-8 w-auto" />
                  <span className="ml-2 text-lg font-semibold">EmailVerify</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive =
                    pathname === item.href ||
                    (item.subItems && item.subItems.some((subItem) => pathname === subItem.href))
                  const isSubMenuOpen = subMenuStates[item.href] || false

                  return (
                    <div key={item.href} className="relative">
                      {item.subItems ? (
                        <>
                          <button
                            onClick={() =>
                              setSubMenuStates((prevState) => ({
                                ...prevState,
                                [item.href]: !isSubMenuOpen,
                              }))
                            }
                            className={`flex items-center justify-between w-full rounded-lg px-3 py-2 transition-all ${
                              isActive
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5" />
                              <span>{item.label}</span>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isSubMenuOpen ? "transform rotate-180" : ""}`}
                            />
                          </button>

                          <AnimatePresence>
                            {isSubMenuOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-9 mt-1 space-y-1 overflow-hidden"
                              >
                                {item.subItems.map((subItem) => {
                                  const isSubActive = pathname === subItem.href
                                  return (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className={`block rounded-lg px-3 py-1.5 text-sm transition-all ${
                                        isSubActive
                                          ? "bg-blue-50 text-blue-600 font-medium"
                                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                      }`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {subItem.label}
                                    </Link>
                                  )
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                            isActive
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="p-4 border-t mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Credits</span>
                  <span className="text-sm font-bold">{user?.credits?.toLocaleString() || 0}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/credits/buy" onClick={() => setIsMobileMenuOpen(false)}>
                    Buy Credits
                  </Link>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 md:flex-none">
              <h1 className="text-lg font-semibold md:hidden">EmailVerify</h1>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.filter((n) => !n.read).length > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex justify-between">
                    <span>Notifications</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-blue-600">
                      Mark all as read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                        <div className="flex items-start justify-between w-full">
                          <div className="font-medium flex items-center gap-2">
                            {notification.title}
                            {!notification.read && <span className="h-2 w-2 rounded-full bg-blue-600"></span>}
                          </div>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="py-4 text-center text-gray-500">No notifications</div>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/notifications" className="w-full text-center text-sm text-blue-600">
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div>
                      <p>{user?.name || "User"}</p>
                      <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          className="flex-1 p-4 md:p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
