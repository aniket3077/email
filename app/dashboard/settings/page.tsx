"use client"

import React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Bell, Globe, Shield, CreditCard, Mail } from "lucide-react"

type Settings = {
  emailNotifications: boolean
  marketingEmails: boolean
  twoFactorAuth: boolean
  language: string
  timezone: string
  currency: string
}

export default function SettingsPage() {
  const { user, isLoading } = useAuth()
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
    language: "en",
    timezone: "UTC",
    currency: "USD",
  })

  const handleToggle = (setting: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleSelect = (setting: keyof Settings, value: string) => {
    setSettings((prev) => ({ ...prev, [setting]: value }))
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
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive notifications about your account activity</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle("emailNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={() => handleToggle("marketingEmails")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>Manage your account security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={() => handleToggle("twoFactorAuth")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Regional Settings
          </CardTitle>
          <CardDescription>Set your preferred language and region</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={settings.language} onValueChange={(value) => handleSelect("language", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select value={settings.timezone} onValueChange={(value) => handleSelect("timezone", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">Eastern Time</SelectItem>
                <SelectItem value="PST">Pacific Time</SelectItem>
                <SelectItem value="GMT">GMT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select value={settings.currency} onValueChange={(value) => handleSelect("currency", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            API Settings
          </CardTitle>
          <CardDescription>Manage your API keys and integration settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">API Key</h3>
                <p className="text-sm text-gray-500">Your secret API key for integration</p>
              </div>
              <Button variant="outline">Regenerate Key</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Webhook URL</h3>
                <p className="text-sm text-gray-500">Configure webhook notifications</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
    </div>
  )
} 