"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { apiService } from "@/lib/api-service"
import { Check, Loader2, CreditCard, Gift } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface CreditPackage {
  id: string
  name: string
  credits: number
  price: number
  bonus?: number
  popular?: boolean
}

const packages: CreditPackage[] = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 500,
    price: 299,
  },
  {
    id: "standard",
    name: "Standard Pack",
    credits: 1000,
    price: 499,
    bonus: 100,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Pack",
    credits: 2500,
    price: 999,
    bonus: 500,
  },
  {
    id: "enterprise",
    name: "Enterprise Pack",
    credits: 5000,
    price: 1799,
    bonus: 1500,
  },
]

export default function BuyCreditsPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const calculateCustomCredits = (amount: number) => {
    // Base rate: 1 credit = ₹0.5
    const baseCredits = Math.floor(amount * 2)
    // Bonus credits for larger purchases
    const bonus = amount >= 1000 ? Math.floor(baseCredits * 0.2) : 0
    return baseCredits + bonus
  }

  const handleBuyCredits = async (packageId: string | null, amount?: number) => {
    if (!user?.token) return

    setIsLoading(true)
    try {
      let credits = 0
      if (packageId) {
        const selected = packages.find(p => p.id === packageId)
        if (selected) {
          credits = selected.credits + (selected.bonus || 0)
        }
      } else if (amount) {
        credits = calculateCustomCredits(amount)
      }

      if (credits === 0) {
        throw new Error("Invalid credit amount")
      }

      const result = await apiService.credits.purchaseCredits(
        user.token,
        credits,
        "credit_purchase"
      )

      toast({
        title: "Success",
        description: `Successfully purchased ${credits} credits!`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase credits. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Buy Credits</h1>
        <p className="text-gray-500">Purchase credits to verify your email addresses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative ${
              pkg.popular ? "border-blue-500 shadow-lg" : ""
            }`}
          >
            {pkg.popular && (
              <Badge className="absolute -top-3 right-4 bg-blue-500">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>
                {pkg.credits} credits
                {pkg.bonus && (
                  <span className="text-green-500 ml-2">
                    +{pkg.bonus} bonus
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">₹{pkg.price}</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{pkg.credits} verification credits</span>
                </li>
                {pkg.bonus && (
                  <li className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-blue-500" />
                    <span>{pkg.bonus} bonus credits</span>
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span>Instant delivery</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={pkg.popular ? "default" : "outline"}
                onClick={() => handleBuyCredits(pkg.id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Buy Now"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Custom Amount</CardTitle>
          <CardDescription>
            Enter the amount you want to spend and get bonus credits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button
                onClick={() => handleBuyCredits(null, Number(customAmount))}
                disabled={isLoading || !customAmount}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Buy Credits"
                )}
              </Button>
            </div>
            {customAmount && (
              <div className="text-sm text-gray-500">
                You will receive approximately{" "}
                <span className="font-medium">
                  {calculateCustomCredits(Number(customAmount))} credits
                </span>
                {Number(customAmount) >= 1000 && (
                  <span className="text-green-500 ml-1">
                    (includes 20% bonus)
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Credit Purchase Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Instant Delivery</h3>
            <p className="text-gray-600">
              Credits are added to your account immediately after purchase.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Bonus Credits</h3>
            <p className="text-gray-600">
              Get up to 20% bonus credits on purchases above ₹1000.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Flexible Usage</h3>
            <p className="text-gray-600">
              Use your credits anytime, with no expiration date.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 