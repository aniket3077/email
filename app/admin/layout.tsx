"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, User, LogOut, Home, Users, Tag, Star, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [user, setUser] = useState({
    name: "Swapnil Chavan",
    avatar: "",
    initials: "S",
  })

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Employees", href: "/admin/employees" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
    { icon: Star, label: "Reviews", href: "/admin/reviews" },
    { icon: Tag, label: "Coupons", href: "/admin/coupons" },
    { icon: BarChart2, label: "Reports", href: "/admin/reports" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="flex flex-col h-full">
            <div className="p-6">
              <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <nav className="flex-1 px-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 border-t">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {/* Header */}
          <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-end px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <span className="text-sm font-medium">{user.name}</span>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
} 