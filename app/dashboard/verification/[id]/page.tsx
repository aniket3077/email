"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Download, Share2, Filter, Search, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { apiService } from "@/lib/api-service"
import { useAuth } from "@/contexts/auth-context"
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

interface VerificationResult {
  id: string
  email: string
  status: "valid" | "invalid" | "risky"
  score: number
  validation: {
    format: boolean
    domain: boolean
    disposable: boolean
    role: boolean
    mx: boolean
    smtp: boolean
  }
}

interface VerificationSummary {
  total: number
  valid: number
  invalid: number
  risky: number
}

export default function VerificationResultPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<VerificationResult[]>([])
  const [summary, setSummary] = useState<VerificationSummary>({
    total: 0,
    valid: 0,
    invalid: 0,
    risky: 0,
  })
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  })

  useEffect(() => {
    fetchResults()
  }, [page])

  const fetchResults = async () => {
    if (!user?.token || !params.id) return

    try {
      const data = await apiService.verification.getVerificationResults(
        user.token,
        params.id as string
      )
      setResults(data.results)
      setSummary(data.summary)
      setHasMore(data.hasMore)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch verification results",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredResults = results.filter((result) =>
    result.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Chart data for status distribution
  const statusChartData = {
    labels: ["Valid", "Invalid", "Risky"],
    datasets: [
      {
        data: [summary.valid, summary.invalid, summary.risky],
        backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
        borderColor: ["#16a34a", "#dc2626", "#d97706"],
        borderWidth: 1,
      },
    ],
  }

  // Chart data for validation metrics
  const validationChartData = {
    labels: ["Format", "Domain", "Disposable", "Role", "MX", "SMTP"],
    datasets: [
      {
        label: "Validation Success Rate",
        data: [
          (results.filter(r => r.validation.format).length / results.length) * 100,
          (results.filter(r => r.validation.domain).length / results.length) * 100,
          (results.filter(r => r.validation.disposable).length / results.length) * 100,
          (results.filter(r => r.validation.role).length / results.length) * 100,
          (results.filter(r => r.validation.mx).length / results.length) * 100,
          (results.filter(r => r.validation.smtp).length / results.length) * 100,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  }

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Success Rate (%)",
        },
      },
    },
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Verification Results</h1>
          <p className="text-gray-500">View detailed results of your email verification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Overview of email verification status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Pie data={statusChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validation Metrics</CardTitle>
            <CardDescription>Success rate of different validation checks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={validationChartData} options={barChartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>Quick overview of verification results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Total Emails</div>
              <div className="text-2xl font-bold">{summary.total}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-500">Valid</div>
              <div className="text-2xl font-bold text-green-600">{summary.valid}</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-sm text-red-500">Invalid</div>
              <div className="text-2xl font-bold text-red-600">{summary.invalid}</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-sm text-yellow-500">Risky</div>
              <div className="text-2xl font-bold text-yellow-600">{summary.risky}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Results</CardTitle>
          <CardDescription>View individual email verification results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div ref={parentRef} className="h-[400px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Validation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const result = filteredResults[virtualRow.index]
                  return (
                    <TableRow
                      key={result.id}
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <TableCell>{result.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            result.status === "valid"
                              ? "default"
                              : result.status === "invalid"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {result.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{result.score}%</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {result.validation.format && (
                            <Badge variant="outline">Format</Badge>
                          )}
                          {result.validation.domain && (
                            <Badge variant="outline">Domain</Badge>
                          )}
                          {result.validation.disposable && (
                            <Badge variant="secondary">Disposable</Badge>
                          )}
                          {result.validation.role && (
                            <Badge variant="secondary">Role</Badge>
                          )}
                          {result.validation.mx && (
                            <Badge variant="outline">MX</Badge>
                          )}
                          {result.validation.smtp && (
                            <Badge variant="outline">SMTP</Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {hasMore && (
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 