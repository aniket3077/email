"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Grid, List, Download } from "lucide-react"

export default function VerificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const verificationResults = [
    {
      id: "255553",
      name: "Swapnil - Sheet 1.csv",
      date: "2025-04-04 12:38:39",
      validPercent: 81,
      riskyPercent: 18,
      badPercent: 1,
      validCount: 50,
      riskyCount: 50,
      badCount: 50,
    },
    {
      id: "255553",
      name: "Swapnil - Sheet 1.csv",
      date: "2025-04-04 12:38:39",
      validPercent: 81,
      riskyPercent: 18,
      badPercent: 1,
      validCount: 50,
      riskyCount: 50,
      badCount: 50,
    },
    {
      id: "255553",
      name: "Swapnil - Sheet 1.csv",
      date: "2025-04-04 12:38:39",
      validPercent: 81,
      riskyPercent: 18,
      badPercent: 1,
      validCount: 50,
      riskyCount: 50,
      badCount: 50,
    },
    {
      id: "255553",
      name: "Swapnil - Sheet 1.csv",
      date: "2025-04-04 12:38:39",
      validPercent: 81,
      riskyPercent: 18,
      badPercent: 1,
      validCount: 50,
      riskyCount: 50,
      badCount: 50,
    },
  ]

  const filteredResults = verificationResults.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.includes(searchQuery),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Results</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="File Name or ID"
              className="pl-8 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setSearchQuery("")}
              >
                <span className="sr-only">Clear search</span>
                <span className="text-gray-500">×</span>
              </Button>
            )}
          </div>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResults.map((result, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">ID {result.id}</p>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-xs text-gray-500">{result.date}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16">
                        <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#4ade80"
                            strokeWidth="2"
                            strokeDasharray={`${result.validPercent} 100`}
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-medium">{result.validPercent}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Good emails are valid, existing emails.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16">
                          <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke="#fbbf24"
                              strokeWidth="2"
                              strokeDasharray={`${result.riskyPercent} 100`}
                            ></circle>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-medium">{result.riskyPercent}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Risky emails may exist or not</p>
                          <p className="text-sm">Count: {result.riskyCount}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16">
                          <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke="#f87171"
                              strokeWidth="2"
                              strokeDasharray={`${result.badPercent} 100`}
                            ></circle>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-medium">{result.badPercent}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Bad emails don't exist</p>
                          <p className="text-sm">Count: {result.badCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Download
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {filteredResults.map((result, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">ID {result.id}</p>
                      <p className="font-medium">{result.name}</p>
                      <p className="text-xs text-gray-500">{result.date}</p>
                    </div>
                    <div className="flex items-center gap-8 mt-4 md:mt-0">
                      <div className="text-center">
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 text-green-600"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm font-medium mt-1">Valid</p>
                        <p className="text-sm">{result.validCount}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 text-yellow-600"
                            >
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                              <line x1="12" y1="9" x2="12" y2="13"></line>
                              <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm font-medium mt-1">Risky</p>
                        <p className="text-sm">{result.riskyCount}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 text-red-600"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm font-medium mt-1">Bad</p>
                        <p className="text-sm">{result.badCount}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
                        Download
                        <Download className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
