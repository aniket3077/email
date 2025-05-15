"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { apiService } from "@/lib/api-service"
import { Check, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  credits: number
  features: string[]
  popular?: boolean
}

const plans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for small businesses",
    price: 499,
    credits: 1000,
    features: [
      "1000 email verifications",
      "Basic validation checks",
      "CSV export",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    description: "Best for growing businesses",
    price: 999,
    credits: 2500,
    features: [
      "2500 email verifications",
      "Advanced validation checks",
      "CSV & Excel export",
      "Priority email support",
      "API access",
      "Bulk verification",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: 2499,
    credits: 10000,
    features: [
      "10000 email verifications",
      "Full validation suite",
      "All export formats",
      "24/7 priority support",
      "API access",
      "Bulk verification",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
]

export default function SubscriptionPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (planId: string) => {
    if (!user?.token) return

    setIsLoading(true)
    try {
      const result = await apiService.credits.purchaseCredits(
        user.token,
        plans.find(p => p.id === planId)?.credits || 0,
        "subscription"
      )

      toast({
        title: "Success",
        description: "Your subscription has been activated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process subscription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <p className="text-gray-500">Choose the perfect plan for your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "relative",
              plan.popular ? "border-blue-500 shadow-lg" : ""
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-4">
                <Badge variant="default" className="bg-blue-500">
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">₹{plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <React.Fragment>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </React.Fragment>
                ) : (
                  "Subscribe Now"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Why Choose Our Service?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Accurate Verification</h3>
            <p className="text-gray-600">
              Our advanced algorithms ensure high accuracy in email verification,
              helping you maintain a clean email list.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Fast Processing</h3>
            <p className="text-gray-600">
              Process thousands of email addresses in minutes with our
              high-performance verification system.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">
              Your data is encrypted and secure. We maintain 99.9% uptime
              to ensure reliable service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 