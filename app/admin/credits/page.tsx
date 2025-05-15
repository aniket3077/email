"use client"

import { useState, useEffect } from "react"
import { 
  PlusCircle, MinusCircle, Download, Search, 
  RefreshCw, Filter, ArrowUpDown 
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { activeApiService } from "@/lib/api-config"
import { useAuth } from "@/contexts/auth-context"

// Formatting utilities
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

export default function CreditManagementPage() {
  const { token } = useAuth()
  const [users, setUsers] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [creditAmount, setCreditAmount] = useState("100")
  const [creditAction, setCreditAction] = useState("add")
  const [openDialog, setOpenDialog] = useState(false)
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Fetch users and transaction data
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return
      
      setLoading(true)
      try {
        // Simulate API calls since we're using a dev API
        // In production, you would call the real endpoints
        const usersData = await fetch("/api/admin/users").then(res => res.json())
        .catch(() => {
          // Mock data for development
          return [
            { id: "1", name: "Alice Smith", email: "alice@example.com", credits: 2500, lastLogin: "2023-08-15T10:30:00Z" },
            { id: "2", name: "Bob Johnson", email: "bob@company.com", credits: 750, lastLogin: "2023-08-14T08:45:00Z" },
            { id: "3", name: "Charlie Brown", email: "charlie@gmail.com", credits: 1200, lastLogin: "2023-08-16T14:20:00Z" },
            { id: "4", name: "Diana Prince", email: "diana@outlook.com", credits: 300, lastLogin: "2023-08-10T11:15:00Z" },
            { id: "5", name: "Edward Norton", email: "edward@domain.com", credits: 5000, lastLogin: "2023-08-17T09:50:00Z" },
            { id: "6", name: "Fiona Apple", email: "fiona@email.org", credits: 1500, lastLogin: "2023-08-12T16:40:00Z" },
            { id: "7", name: "George Lucas", email: "george@starwars.com", credits: 8000, lastLogin: "2023-08-14T13:10:00Z" },
            { id: "8", name: "Hannah Montana", email: "hannah@music.co", credits: 450, lastLogin: "2023-08-11T10:05:00Z" },
          ]
        })
        
        const transactionsData = await fetch("/api/admin/transactions").then(res => res.json())
        .catch(() => {
          // Mock data for development
          return [
            { id: "tx1", userId: "1", amount: 500, type: "purchase", date: "2023-08-14T12:30:00Z", description: "Credit package purchase" },
            { id: "tx2", userId: "3", amount: -200, type: "usage", date: "2023-08-15T14:20:00Z", description: "Email verification batch" },
            { id: "tx3", userId: "2", amount: -50, type: "usage", date: "2023-08-15T16:45:00Z", description: "Email verification" },
            { id: "tx4", userId: "5", amount: 2000, type: "purchase", date: "2023-08-16T09:15:00Z", description: "Subscription renewal" },
            { id: "tx5", userId: "4", amount: 300, type: "admin", date: "2023-08-16T11:30:00Z", description: "Credit adjustment" },
            { id: "tx6", userId: "7", amount: -1000, type: "usage", date: "2023-08-17T10:20:00Z", description: "Bulk email verification" },
            { id: "tx7", userId: "1", amount: -100, type: "usage", date: "2023-08-17T13:40:00Z", description: "API usage" },
            { id: "tx8", userId: "6", amount: 750, type: "purchase", date: "2023-08-17T15:55:00Z", description: "Credit package" },
          ]
        })
        
        setUsers(usersData)
        setTransactions(transactionsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [token])

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort users based on column and direction
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0
    
    switch (sortColumn) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "email":
        comparison = a.email.localeCompare(b.email)
        break
      case "credits":
        comparison = a.credits - b.credits
        break
      case "lastLogin":
        comparison = new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime()
        break
      default:
        comparison = 0
    }
    
    return sortDirection === "asc" ? comparison : -comparison
  })

  // Handle credit adjustment
  const handleCreditAdjustment = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      setSelectedUser(user)
      setOpenDialog(true)
    }
  }

  // Submit credit adjustment
  const submitCreditAdjustment = async () => {
    if (!selectedUser || !creditAmount) return
    
    const amount = parseInt(creditAmount)
    if (isNaN(amount) || amount <= 0) return
    
    const adjustedAmount = creditAction === "add" ? amount : -amount
    
    // In a real app, you would call your API here
    // For now, we'll just update the state
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, credits: user.credits + adjustedAmount }
        : user
    ))
    
    // Add a new transaction
    const newTransaction = {
      id: `tx${Date.now()}`,
      userId: selectedUser.id,
      amount: adjustedAmount,
      type: "admin",
      date: new Date().toISOString(),
      description: `Admin ${creditAction === "add" ? "added" : "removed"} credits`
    }
    
    setTransactions([newTransaction, ...transactions])
    
    // Close dialog and reset state
    setOpenDialog(false)
    setSelectedUser(null)
    setCreditAmount("100")
    setCreditAction("add")
  }
  
  // Handle column sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Credit Management</h1>
        <div className="flex gap-2">
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Credits</CardTitle>
            <CardDescription>Across all users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading ? "..." : users.reduce((sum, user) => sum + user.credits, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Credits</CardTitle>
            <CardDescription>Per user</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading || users.length === 0 
                ? "..." 
                : Math.round(users.reduce((sum, user) => sum + user.credits, 0) / users.length).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading 
                ? "..." 
                : transactions.filter(tx => 
                    new Date(tx.date).getTime() > Date.now() - 24 * 60 * 60 * 1000
                  ).length}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search users..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Adjust Credits
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adjust User Credits</DialogTitle>
                  <DialogDescription>
                    Add or remove credits from a user's account.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="user">Select User</Label>
                    <Select onValueChange={(value) => setSelectedUser(users.find(u => u.id === value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="action">Action</Label>
                    <Select defaultValue="add" onValueChange={(value) => setCreditAction(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="add">Add Credits</SelectItem>
                        <SelectItem value="remove">Remove Credits</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      value={creditAmount}
                      onChange={(e) => setCreditAmount(e.target.value)}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={submitCreditAdjustment} disabled={!selectedUser || !creditAmount}>
                    {creditAction === "add" ? "Add" : "Remove"} Credits
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                  User Name
                  {sortColumn === "name" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort("email")} className="cursor-pointer">
                  Email
                  {sortColumn === "email" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort("credits")} className="cursor-pointer text-right">
                  Credits
                  {sortColumn === "credits" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort("lastLogin")} className="cursor-pointer">
                  Last Login
                  {sortColumn === "lastLogin" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
                    <p className="text-sm text-gray-500 mt-2">Loading users...</p>
                  </TableCell>
                </TableRow>
              ) : sortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <p className="text-sm text-gray-500">No users found</p>
                  </TableCell>
                </TableRow>
              ) : (
                sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-right font-medium">{user.credits.toLocaleString()}</TableCell>
                    <TableCell>{formatDate(user.lastLogin)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCreditAdjustment(user.id)}
                      >
                        Adjust
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
                    <p className="text-sm text-gray-500 mt-2">Loading transactions...</p>
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <p className="text-sm text-gray-500">No transactions found</p>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.slice(0, 10).map((tx) => {
                  const user = users.find(u => u.id === tx.userId) || { name: "Unknown User" }
                  return (
                    <TableRow key={tx.id}>
                      <TableCell>{formatDate(tx.date)}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium 
                          ${tx.type === 'purchase' ? 'bg-green-100 text-green-800' : 
                           tx.type === 'usage' ? 'bg-blue-100 text-blue-800' :
                           'bg-purple-100 text-purple-800'}`}>
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{tx.description}</TableCell>
                      <TableCell className={`text-right font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
        
        {transactions.length > 10 && (
          <div className="p-4 text-center">
            <Button variant="outline">View All Transactions</Button>
          </div>
        )}
      </div>
    </div>
  )
} 