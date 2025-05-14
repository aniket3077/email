"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const historyData = [
    {
      date: "2025-04-16 11:17 AM",
      action: "Start verifying: swapap email - Sheet01.csv (28500143)",
      spend: -1,
      balance: 97,
    },
    {
      date: "2025-04-16 11:17 AM",
      action: "Start verifying: swapap email - Sheet01.csv (28500143)",
      spend: -1,
      balance: 98,
    },
    {
      date: "2025-04-16 11:17 AM",
      action: "Start verifying: swapap email - Sheet01.csv (28500143)",
      spend: -1,
      balance: 99,
    },
    {
      date: "2025-04-16 11:17 AM",
      action: "Free Credits",
      spend: 100,
      balance: 100,
    },
  ]

  const filteredHistory = historyData.filter((item) => item.action.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">History</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Balance:</p>
          <p className="text-xl font-bold">97</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Swapnil Chavan</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search history..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Spend</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-sm">{item.date}</TableCell>
                  <TableCell className="text-sm">{item.action}</TableCell>
                  <TableCell className={`text-sm ${item.spend > 0 ? "text-green-600" : "text-red-600"}`}>
                    {item.spend > 0 ? `+${item.spend}` : item.spend}
                  </TableCell>
                  <TableCell className="text-sm">{item.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
