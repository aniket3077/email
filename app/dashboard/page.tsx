"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  FileUp,
  BarChart,
  Mail,
  ArrowUpRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  RefreshCw,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Progress } from "@/components/ui/progress"
import { apiService } from "@/lib/api-service"

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth()

  const [emailList, setEmailList] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [recentVerifications, setRecentVerifications] = useState([
    {
      id: "VER-255553",
      name: "Marketing Campaign - May 2025",
      date: "2025-05-10 12:38:39",
      valid: 220,
      invalid: 20,
      risky: 5,
      total: 245,
    },
    {
      id: "VER-255552",
      name: "Newsletter Subscribers - Q2",
      date: "2025-05-08 09:15:22",
      valid: 1850,
      invalid: 142,
      risky: 38,
      total: 2030,
    },
  ])
  const [stats, setStats] = useState({
    totalVerified: 125430,
    validEmails: 98342,
    successRate: 78.4,
    creditsUsed: 27088,
  })

  // Fetch dashboard data
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoadingStats(false)
      setIsLoadingHistory(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleVerify = async () => {
    if (!emailList.trim()) return

    setIsVerifying(true)

    try {
      // Split email list by newlines and filter empty lines
      const emails = emailList.split("\n").filter((email) => email.trim() !== "")

      if (emails.length === 0) {
        alert("Please enter at least one email address")
        setIsVerifying(false)
        return
      }

      // Call the actual API service
      const result = await apiService.verification.verifyEmails(user?.token || "", emails)

      // Add the verification to the list
      const newVerification = {
        id: result.id,
        name: "Manual Verification",
        date: new Date().toISOString().replace("T", " ").substring(0, 19),
        valid: result.valid,
        invalid: result.invalid,
        risky: result.risky,
        total: emails.length,
      }

      setRecentVerifications([newVerification, ...recentVerifications])
      setEmailList("")
      alert(`Successfully verified ${emails.length} emails`)
    } catch (error) {
      console.error("Error verifying emails:", error)
      alert("Failed to verify emails. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const statCards = [
    {
      title: "Total Verified",
      value: stats.totalVerified.toLocaleString(),
      icon: Mail,
      change: "+12.5%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Valid Emails",
      value: stats.validEmails.toLocaleString(),
      icon: CheckCircle,
      change: "+10.3%",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: BarChart,
      change: "+2.1%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Credits Used",
      value: stats.creditsUsed.toLocaleString(),
      icon: ArrowUpRight,
      change: "+15.2%",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back{user?.name ? `, ${user.name}` : ""}! Here's an overview of your email verification activity.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setIsLoadingStats(true)
              setIsLoadingHistory(true)
              setTimeout(() => {
                setIsLoadingStats(false)
                setIsLoadingHistory(false)
              }, 1000)
            }}
            disabled={isLoadingStats || isLoadingHistory}
            className="flex items-center gap-2"
          >
            {isLoadingStats || isLoadingHistory ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
          <Button asChild className="flex items-center gap-2">
            <Link href="/dashboard/verification/new">
              <Upload className="h-4 w-4" />
              New Verification
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoadingStats
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-4 w-24 mb-2 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="mt-4">
                      <div className="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
          : statCards.map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden border-t-4" style={{ borderTopColor: stat.color.split("-")[1] }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      </div>
                      <div className={`rounded-full p-2 ${stat.bgColor}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <span
                        className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                      >
                        {stat.change} from last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>

      {/* Quick Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Email Verification</CardTitle>
          <CardDescription>Verify email addresses instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single-mail" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="single-mail">Single Mail</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>
            <TabsContent value="single-mail" className="mt-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Paste email list (one per line)</p>
                  <Textarea
                    placeholder="example1@domain.com
example2@domain.com
example3@domain.com"
                    className="min-h-[150px]"
                    value={emailList}
                    onChange={(e) => setEmailList(e.target.value)}
                    disabled={isVerifying}
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleVerify}
                    disabled={isVerifying || !emailList.trim()}
                  >
                    {isVerifying ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Verifying...
                      </div>
                    ) : (
                      "Verify Now"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileUp className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">CSV, Excel, or Text files (max. 10MB)</p>
                  </div>
                  <Input id="dropzone-file-upload" type="file" className="hidden" />
                </label>
              </div>
            </TabsContent>

            <TabsContent value="integration" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Connect your email service provider to automatically verify your email lists
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Mailchimp", "SendGrid", "Campaign Monitor", "HubSpot", "Constant Contact", "ActiveCampaign"].map(
                    (provider, i) => (
                      <motion.div
                        key={provider}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <Button variant="outline" className="h-20 flex flex-col w-full">
                          <span>{provider}</span>
                          <span className="text-xs text-gray-500">Connect</span>
                        </Button>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="api" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Use our API to integrate email verification into your applications
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    <code>
                      {`// Example API Request
fetch('https://api.emailverify.com/v1/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    email: 'example@domain.com'
  })
})`}
                    </code>
                  </pre>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Get API Key</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Verifications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Verifications</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/verification/results">View All</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {isLoadingHistory ? (
            Array(2)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="border border-gray-200 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                          <div className="h-5 w-48 bg-gray-200 animate-pulse rounded"></div>
                          <div className="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                        <div className="flex items-center gap-8 mt-4 md:mt-0">
                          <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse"></div>
                          <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse"></div>
                          <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-end">
                      <div className="h-9 w-28 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : recentVerifications.length > 0 ? (
            recentVerifications.map((verification, index) => (
              <motion.div
                key={verification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border border-gray-200 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">{verification.id}</p>
                          <p className="font-medium">{verification.name}</p>
                          <p className="text-xs text-gray-500">{verification.date}</p>
                          <div className="mt-2">
                            <Progress value={(verification.valid / verification.total) * 100} className="h-2" />
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>{Math.round((verification.valid / verification.total) * 100)}% valid</span>
                              <span>{verification.total.toLocaleString()} emails</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-8 mt-4 md:mt-0">
                          <div className="text-center">
                            <div className="flex justify-center">
                              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              </div>
                            </div>
                            <p className="text-sm font-medium mt-1">Valid</p>
                            <p className="text-sm">{verification.valid.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <div className="flex justify-center">
                              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <XCircle className="h-6 w-6 text-red-600" />
                              </div>
                            </div>
                            <p className="text-sm font-medium mt-1">Invalid</p>
                            <p className="text-sm">{verification.invalid.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <div className="flex justify-center">
                              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                <AlertCircle className="h-6 w-6 text-yellow-600" />
                              </div>
                            </div>
                            <p className="text-sm font-medium mt-1">Risky</p>
                            <p className="text-sm">{verification.risky.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/verification/${verification.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
              <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No verifications yet</h3>
              <p className="mt-1 text-sm text-gray-500">Start by verifying your first email list</p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/dashboard/verification/new">New Verification</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
