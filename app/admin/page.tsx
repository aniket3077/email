"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ArrowUpIcon, ArrowDownIcon, Users, CheckCircle, CreditCard, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js'
import { Line, Doughnut, Bar } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()
  
  // Extra safeguard to ensure admin access
  useEffect(() => {
    // Wait until authentication state is determined
    if (!isLoading) {
      // If not authenticated or not an admin, redirect
      if (!isAuthenticated || (user && user.role !== 'admin')) {
        router.push('/login')
      }
    }
  }, [isLoading, isAuthenticated, user, router])

  // Sample data for dashboard
  const stats = [
    {
      title: "Existing Users",
      value: "5,653",
      change: "+22.45%",
      increasing: true,
      icon: Users,
    },
    {
      title: "New Users",
      value: "1,650",
      change: "+15.34%",
      increasing: true,
      icon: Users,
    },
    {
      title: "Total Verifications",
      value: "9,504",
      change: "-18.25%",
      increasing: false,
      icon: CheckCircle,
    },
    {
      title: "Credits Sold",
      value: "5,423",
      change: "-10.24%",
      increasing: false,
      icon: CreditCard,
    },
  ]

  // Line chart data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55, 72, 68, 85],
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      },
      {
        label: 'Users',
        data: [28, 48, 40, 42, 51, 68, 71, 76, 89],
        fill: false,
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.1
      }
    ]
  }

  // Doughnut chart data
  const doughnutChartData = {
    labels: ['USA', 'Canada', 'UK', 'Australia', 'Other'],
    datasets: [
      {
        data: [55, 20, 15, 6, 4],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(244, 63, 94)',
          'rgb(234, 179, 8)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 0,
      }
    ]
  }

  // Bar chart data
  const barChartData = {
    labels: ['Mobile', 'Desktop', 'Tablet', 'Other'],
    datasets: [
      {
        label: 'Device Usage',
        data: [62, 20, 13, 5],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      }
    ]
  }

  // Top clients data
  const topClients = [
    { id: 1, name: "Lee Henry", avatar: "A", orders: 52, spent: "$969.37" },
    { id: 2, name: "Myrtle McBride", avatar: "M", orders: 43, spent: "$909.54" },
    { id: 3, name: "Tommy Walker", avatar: "T", orders: 41, spent: "$728.90" },
    { id: 4, name: "Lela Cannon", avatar: "L", orders: 38, spent: "$679.42" },
    { id: 5, name: "Jimmy Cook", avatar: "J", orders: 34, spent: "$549.71" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">Overview of your email verification platform.</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center pt-1">
                {stat.increasing ? (
                  <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stat.increasing ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue & User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Line 
                data={lineChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribution by Country</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full max-w-[300px]">
              <Doughnut 
                data={doughnutChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                <div>Name</div>
                <div className="text-right">Orders</div>
                <div className="text-right">Spent</div>
                <div></div>
              </div>
              <div className="space-y-4">
                {topClients.map((client) => (
                  <div key={client.id} className="grid grid-cols-4 items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                        {client.avatar}
                      </div>
                      <div>{client.name}</div>
                    </div>
                    <div className="text-right">{client.orders}</div>
                    <div className="text-right">{client.spent}</div>
                    <div className="flex justify-end">
                      <button className="text-blue-600 hover:underline">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Visits by Device</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar 
                data={barChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Revenue</div>
                <div className="text-blue-600 font-bold">$5,653 / $10,000</div>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: "56.53%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">New Users</div>
                <div className="text-blue-600 font-bold">654 / 1,000</div>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: "65.4%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Email Verifications</div>
                <div className="text-blue-600 font-bold">24,587 / 50,000</div>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: "49.17%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 