"use client"

import { useState } from "react"
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  RefreshCw, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Calendar, 
  CheckCircle,
  AlertCircle, 
  PieChart
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
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Subscription plan interface
interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  billing: 'monthly' | 'annually'
  features: string[]
  status: 'active' | 'inactive' | 'archived'
  userCount: number
  createdAt: string
}

// Subscription user interface
interface SubscriptionUser {
  id: string
  name: string
  email: string
  plan: string
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  startDate: string
  endDate: string
  amount: number
  autoRenew: boolean
}

export default function AdminSubscriptionsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("plans")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddPlanDialog, setShowAddPlanDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)
  
  // Dummy subscription plans data
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([
    {
      id: "plan_1",
      name: "Basic Plan",
      description: "Essential features for small businesses",
      price: 29.99,
      billing: 'monthly',
      features: ["5,000 email verifications/month", "API access", "Standard support"],
      status: 'active',
      userCount: 145,
      createdAt: "2023-05-15"
    },
    {
      id: "plan_2",
      name: "Pro Plan",
      description: "Advanced features for growing businesses",
      price: 79.99,
      billing: 'monthly',
      features: ["20,000 email verifications/month", "API access", "Priority support", "Custom integration"],
      status: 'active',
      userCount: 87,
      createdAt: "2023-05-15"
    },
    {
      id: "plan_3",
      name: "Enterprise Plan",
      description: "Complete solution for large organizations",
      price: 199.99,
      billing: 'monthly',
      features: ["Unlimited email verifications", "API access", "24/7 support", "Custom integration", "Dedicated account manager"],
      status: 'active',
      userCount: 32,
      createdAt: "2023-05-15"
    },
    {
      id: "plan_4",
      name: "Starter Annual",
      description: "Annual plan with basic features",
      price: 299.99,
      billing: 'annually',
      features: ["10,000 email verifications/month", "API access", "Standard support"],
      status: 'active',
      userCount: 64,
      createdAt: "2023-06-20"
    },
    {
      id: "plan_5",
      name: "Legacy Plan",
      description: "Previous version of our basic plan",
      price: 19.99,
      billing: 'monthly',
      features: ["3,000 email verifications/month", "Basic support"],
      status: 'archived',
      userCount: 18,
      createdAt: "2022-12-01"
    }
  ])
  
  // Dummy subscription users data
  const [subscriptionUsers, setSubscriptionUsers] = useState<SubscriptionUser[]>([
    {
      id: "sub_1",
      name: "John Doe",
      email: "john@example.com",
      plan: "Pro Plan",
      status: 'active',
      startDate: "2023-06-15",
      endDate: "2024-06-15",
      amount: 79.99,
      autoRenew: true
    },
    {
      id: "sub_2",
      name: "Jane Smith",
      email: "jane@company.com",
      plan: "Enterprise Plan",
      status: 'active',
      startDate: "2023-07-20",
      endDate: "2024-07-20",
      amount: 199.99,
      autoRenew: true
    },
    {
      id: "sub_3",
      name: "Michael Johnson",
      email: "michael@business.org",
      plan: "Basic Plan",
      status: 'trial',
      startDate: "2023-10-05",
      endDate: "2023-10-19",
      amount: 0,
      autoRenew: false
    },
    {
      id: "sub_4",
      name: "Sarah Williams",
      email: "sarah@example.net",
      plan: "Pro Plan",
      status: 'cancelled',
      startDate: "2023-05-10",
      endDate: "2023-11-10",
      amount: 79.99,
      autoRenew: false
    },
    {
      id: "sub_5",
      name: "Robert Brown",
      email: "robert@company.io",
      plan: "Starter Annual",
      status: 'active',
      startDate: "2023-09-01",
      endDate: "2024-09-01",
      amount: 299.99,
      autoRenew: true
    },
    {
      id: "sub_6",
      name: "Emily Davis",
      email: "emily@tech.co",
      plan: "Basic Plan",
      status: 'expired',
      startDate: "2023-04-15",
      endDate: "2023-10-15",
      amount: 29.99,
      autoRenew: false
    }
  ])
  
  // Filter plans based on search term
  const filteredPlans = subscriptionPlans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Filter users based on search term
  const filteredUsers = subscriptionUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.plan.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
  
  // Get status color
  const getPlanStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Get subscription status color
  const getSubscriptionStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-orange-100 text-orange-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'trial':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  
  // Add or edit plan
  const handleSubmitPlan = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      if (selectedPlan) {
        // Edit existing plan
        setSubscriptionPlans(plans => 
          plans.map(plan => plan.id === selectedPlan.id ? selectedPlan : plan)
        )
      } else {
        // Add new plan with random ID
        const newPlan = {
          ...newPlanData,
          id: `plan_${Math.floor(Math.random() * 1000)}`,
          createdAt: new Date().toISOString().split('T')[0],
          userCount: 0
        } as SubscriptionPlan
        
        setSubscriptionPlans(plans => [...plans, newPlan])
      }
      
      setShowAddPlanDialog(false)
      setSelectedPlan(null)
      setIsLoading(false)
    }, 1000)
  }
  
  // Delete plan
  const handleDeletePlan = (planId: string) => {
    if (confirm("Are you sure you want to delete this plan? This cannot be undone.")) {
      setIsLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        setSubscriptionPlans(plans => plans.filter(plan => plan.id !== planId))
        setIsLoading(false)
      }, 1000)
    }
  }
  
  // New plan data
  const [newPlanData, setNewPlanData] = useState<Partial<SubscriptionPlan>>({
    name: "",
    description: "",
    price: 0,
    billing: 'monthly',
    features: [],
    status: 'inactive'
  })
  
  // Edit existing plan
  const handleEditPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan)
    setShowAddPlanDialog(true)
  }
  
  // Statistics for dashboard
  const totalRevenue = subscriptionUsers.reduce((sum, user) => sum + (user.status === 'active' ? user.amount : 0), 0)
  const activeSubscribers = subscriptionUsers.filter(user => user.status === 'active').length
  const trialUsers = subscriptionUsers.filter(user => user.status === 'trial').length
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search plans or users..."
              className="pl-8 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {activeTab === "plans" && (
            <Button onClick={() => {
              setSelectedPlan(null)
              setShowAddPlanDialog(true)
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Plan
            </Button>
          )}
        </div>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Active Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}/month</div>
            <p className="text-xs text-gray-500">From {activeSubscribers} active subscriptions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscribers}</div>
            <p className="text-xs text-gray-500">
              {trialUsers > 0 ? `Plus ${trialUsers} users on trial` : 'No users on trial'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Most Popular Plan</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscriptionPlans.sort((a, b) => b.userCount - a.userCount)[0]?.name}
            </div>
            <p className="text-xs text-gray-500">
              {subscriptionPlans.sort((a, b) => b.userCount - a.userCount)[0]?.userCount} subscribers
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
        </TabsList>
        
        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Subscription Plans
              </CardTitle>
              <CardDescription>
                Manage the subscription plans available to your customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Billing</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscribers</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-xs text-gray-500">{plan.description}</div>
                      </TableCell>
                      <TableCell>{formatCurrency(plan.price)}</TableCell>
                      <TableCell className="capitalize">{plan.billing}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPlanStatusColor(plan.status)}>
                          {plan.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{plan.userCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditPlan(plan)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeletePlan(plan.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredPlans.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                        No subscription plans found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Subscribers Tab */}
        <TabsContent value="subscribers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Subscribers
              </CardTitle>
              <CardDescription>
                Manage users with active or expired subscriptions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Auto Renew</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </TableCell>
                      <TableCell>{user.plan}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSubscriptionStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.startDate}</TableCell>
                      <TableCell>{user.endDate}</TableCell>
                      <TableCell>{formatCurrency(user.amount)}</TableCell>
                      <TableCell>
                        {user.autoRenew ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-300" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                        No subscribers found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add/Edit Plan Dialog */}
      <Dialog open={showAddPlanDialog} onOpenChange={setShowAddPlanDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedPlan ? 'Edit Subscription Plan' : 'Add New Subscription Plan'}</DialogTitle>
            <DialogDescription>
              {selectedPlan 
                ? 'Update the details of this subscription plan' 
                : 'Create a new subscription plan for your customers'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan-name" className="text-right">
                Plan Name
              </Label>
              <Input
                id="plan-name"
                value={selectedPlan?.name || newPlanData.name}
                onChange={(e) => selectedPlan 
                  ? setSelectedPlan({...selectedPlan, name: e.target.value})
                  : setNewPlanData({...newPlanData, name: e.target.value})
                }
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan-description" className="text-right">
                Description
              </Label>
              <Input
                id="plan-description"
                value={selectedPlan?.description || newPlanData.description}
                onChange={(e) => selectedPlan
                  ? setSelectedPlan({...selectedPlan, description: e.target.value})
                  : setNewPlanData({...newPlanData, description: e.target.value})
                }
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan-price" className="text-right">
                Price
              </Label>
              <Input
                id="plan-price"
                type="number"
                value={selectedPlan?.price || newPlanData.price}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  selectedPlan
                    ? setSelectedPlan({...selectedPlan, price: value})
                    : setNewPlanData({...newPlanData, price: value})
                }}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan-billing" className="text-right">
                Billing
              </Label>
              <Select
                value={selectedPlan?.billing || newPlanData.billing}
                onValueChange={(value) => {
                  const billingValue = value as 'monthly' | 'annually';
                  selectedPlan
                    ? setSelectedPlan({...selectedPlan, billing: billingValue})
                    : setNewPlanData({...newPlanData, billing: billingValue});
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select billing cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan-status" className="text-right">
                Status
              </Label>
              <Select
                value={selectedPlan?.status || newPlanData.status}
                onValueChange={(value) => {
                  const statusValue = value as 'active' | 'inactive' | 'archived';
                  selectedPlan
                    ? setSelectedPlan({...selectedPlan, status: statusValue})
                    : setNewPlanData({...newPlanData, status: statusValue});
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPlanDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitPlan} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                selectedPlan ? 'Update Plan' : 'Create Plan'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 