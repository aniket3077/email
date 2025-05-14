"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { DollarSign } from "lucide-react"

export default function CreditsPage() {
  const [selectedCredits, setSelectedCredits] = useState(5000)

  const creditPackages = [
    {
      credits: 2000,
      price: 4.9,
      description: "Most schedules are designed for teams, that is designed for freelancers who want a simple way.",
    },
    {
      credits: 10000,
      price: 37,
      description: "Most schedules are designed for teams, that is designed for freelancers who want a simple way.",
    },
    {
      credits: 2000,
      price: 4.9,
      description: "Most schedules are designed for teams, that is designed for freelancers who want a simple way.",
    },
    {
      credits: 10000,
      price: 37,
      description: "Most schedules are designed for teams, that is designed for freelancers who want a simple way.",
    },
    {
      credits: 2000,
      price: 4.9,
      description: "Most schedules are designed for teams, that is designed for freelancers who want a simple way.",
    },
    {
      credits: 10000,
      price: 37,
      description: "Most schedules are designed for teams, that is designed for freelancers who want a simple way.",
    },
    {
      credits: 2000,
      price: 4.9,
      description: "Most schedules are designed for teams, that is designed for freelancers who want a simple way.",
    },
    {
      credits: 10000,
      price: 37,
      description: "Most schedules are designed for teams, that is designed for freelancers who want a simple way.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Credits</h1>
      </div>

      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-medium">Buy at least 5,000,000 credits & get 1 million credits for free</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {creditPackages.map((pkg, index) => (
          <Card key={index} className="border border-gray-200">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">{pkg.credits.toLocaleString()} Credits</h3>
                  <p className="text-sm text-gray-500">{pkg.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${pkg.price}</div>
                  <div className="text-sm text-gray-500">Per Month</div>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Buy Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">{selectedCredits.toLocaleString()} Credit</h3>
              <p className="text-sm text-gray-500">Per Credit Price: ${(0.00224).toFixed(5)}</p>
            </div>

            <div className="space-y-4">
              <Slider
                defaultValue={[5000]}
                max={25000}
                step={5000}
                onValueChange={(value) => setSelectedCredits(value[0])}
              />

              <div className="flex justify-between">
                <Button
                  variant={selectedCredits === 5000 ? "default" : "outline"}
                  onClick={() => setSelectedCredits(5000)}
                  className="flex-1 mx-1"
                >
                  5k
                </Button>
                <Button
                  variant={selectedCredits === 10000 ? "default" : "outline"}
                  onClick={() => setSelectedCredits(10000)}
                  className="flex-1 mx-1"
                >
                  5k
                </Button>
                <Button
                  variant={selectedCredits === 15000 ? "default" : "outline"}
                  onClick={() => setSelectedCredits(15000)}
                  className="flex-1 mx-1"
                >
                  5k
                </Button>
                <Button
                  variant={selectedCredits === 20000 ? "default" : "outline"}
                  onClick={() => setSelectedCredits(20000)}
                  className="flex-1 mx-1"
                >
                  5k
                </Button>
                <Button
                  variant={selectedCredits === 25000 ? "default" : "outline"}
                  onClick={() => setSelectedCredits(25000)}
                  className="flex-1 mx-1"
                >
                  5k
                </Button>
                <Button variant="outline" className="flex-1 mx-1">
                  Custom
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
