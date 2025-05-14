"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

export default function AddSubuserPage() {
  const [formData, setFormData] = useState({
    name: "Swapnil Chavan",
    email: "",
    phone: "",
    accountType: "isolated",
  })
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would connect to your backend API here
    console.log("Adding subuser:", formData)

    // For demo purposes, we'll just redirect back to the profile
    router.push("/dashboard/profile")
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="enter lamark"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="enter lamark"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup
                value={formData.accountType}
                onValueChange={(value) => handleChange("accountType", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="isolated" id="isolated" />
                  <Label htmlFor="isolated">Isolated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="access" id="access" />
                  <Label htmlFor="access">Access</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
