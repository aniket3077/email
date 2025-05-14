"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, List, CheckCircle, CreditCard, History, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/list-items", label: "List Items", icon: List },
    { href: "/dashboard/verifications", label: "Verifications", icon: CheckCircle },
    { href: "/dashboard/credits", label: "Credits", icon: CreditCard },
    { href: "/dashboard/history", label: "History", icon: History },
    { href: "/dashboard/help", label: "Help", icon: HelpCircle },
  ]

  return (
    <div className="w-64 bg-gray-50 border-r min-h-screen p-4 flex flex-col">
      <div className="flex-1">
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
            <span className="ml-2 text-lg font-semibold">EmailVerify</span>
          </Link>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive ? "bg-blue-100 text-blue-900" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="border-t pt-4 mt-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Credits:</span>
            <span className="font-bold">99</span>
          </div>
          <Button variant="outline" className="w-full" size="sm">
            Buy Credit
          </Button>
        </div>
      </div>
    </div>
  )
}
