"use client"

import React, { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, User, Mail, Building, Phone, Save, CreditCard, Activity, Key, Camera } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { user, isLoading, updateUser } = useAuth()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: user?.company || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    postalCode: user?.postalCode || "",
    vatNumber: user?.vatNumber || "",
  })

  // Update form data when user data is loaded
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        company: user.company || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        postalCode: user.postalCode || "",
        vatNumber: user.vatNumber || "",
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      await updateUser(formData)
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Here you would typically upload the file to your server/storage
      // and get back a URL. For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file)
      
      // Update user profile with new photo URL
      await updateUser({ ...formData, photoUrl: imageUrl })
      
      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile photo",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>Update your personal information and contact details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    disabled
                    placeholder="john@example.com"
                  />
                </div>
                <p className="text-xs text-gray-500">Contact support to change your email address</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Billing Information
          </CardTitle>
          <CardDescription>Manage your billing details and payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Business St"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New York"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United States"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="10001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatNumber">VAT Number</Label>
              <Input
                id="vatNumber"
                name="vatNumber"
                value={formData.vatNumber}
                onChange={handleChange}
                placeholder="VAT123456789"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <h3 className="font-medium">Payment Methods</h3>
              <p className="text-sm text-gray-500">Manage your payment methods and billing history</p>
            </div>
            <Button variant="outline">Manage Payment Methods</Button>
          </div>
        </CardContent>
      </Card>

      {/* API Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            API Usage
          </CardTitle>
          <CardDescription>Monitor your API usage and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">API Calls (This Month)</h3>
                <p className="text-sm text-gray-500">75,000 / 100,000 calls</p>
              </div>
              <span className="text-sm font-medium text-blue-600">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Email Verifications</h3>
                <p className="text-sm text-gray-500">45,000 / 50,000 verifications</p>
              </div>
              <span className="text-sm font-medium text-blue-600">90%</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <h3 className="font-medium">API Key</h3>
              <p className="text-sm text-gray-500">Manage your API keys and access</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Manage API Keys
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
          <CardDescription>Upload a photo to personalize your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={handlePhotoClick}
              >
                {user?.photoUrl ? (
                  <img 
                    src={user.photoUrl} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Camera className="h-8 w-8 text-gray-400" />
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Upload a photo to personalize your account
              </p>
              <p className="text-xs text-gray-400">
                JPG, GIF or PNG. Max size of 5MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
