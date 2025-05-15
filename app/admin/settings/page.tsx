"use client"

import { useState } from "react"
import { Save, RefreshCw, Mail, Globe, Lock, BellRing, Database, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Email Verification Platform",
    siteUrl: "https://emailverify.example.com",
    adminEmail: "admin@example.com",
    companyAddress: "123 Business Street, Tech City, 12345",
    supportPhone: "+1 (555) 123-4567",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
  })
  
  // Email settings state
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@example.com",
    smtpPassword: "••••••••••••",
    senderName: "Email Verify",
    senderEmail: "notifications@example.com",
    enableEmailQueue: true,
  })
  
  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: "90",
    minPasswordLength: "8",
    requireSpecialChars: true,
    maxLoginAttempts: "5",
    sessionTimeout: "60",
    allowedIpRanges: "",
  })
  
  // API settings state
  const [apiSettings, setApiSettings] = useState({
    rateLimitPerMinute: "60",
    rateLimitPerHour: "1000", 
    enableApiKeys: true,
    apiKeyExpiry: "365",
    logApiRequests: true,
    allowCors: true,
    allowedOrigins: "*",
  })
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    adminAlerts: true,
    userSignupAlert: true,
    lowCreditAlert: true,
    securityAlerts: true,
    weeklyReports: true,
    emailTemplate: "default",
  })
  
  // Handle form change
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings(prev => ({ ...prev, [name]: value }))
  }
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSecuritySettings(prev => ({ ...prev, [name]: value }))
  }
  
  const handleApiChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setApiSettings(prev => ({ ...prev, [name]: value }))
  }
  
  // Toggle switch handlers
  const toggleEmailSetting = (name: string) => {
    setEmailSettings(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }
  
  const toggleSecuritySetting = (name: string) => {
    setSecuritySettings(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }
  
  const toggleApiSetting = (name: string) => {
    setApiSettings(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }
  
  const toggleNotificationSetting = (name: string) => {
    setNotificationSettings(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }
  
  // Save settings
  const saveSettings = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real application, you would send the settings to your API
      console.log("Saving settings:", {
        generalSettings,
        emailSettings,
        securitySettings,
        apiSettings,
        notificationSettings
      })
      
      // Show success message or notification
    } catch (error) {
      console.error("Error saving settings:", error)
      // Show error message
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button onClick={saveSettings} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system settings for your email verification platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    name="siteUrl"
                    value={generalSettings.siteUrl}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    name="adminEmail"
                    value={generalSettings.adminEmail}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input
                    id="supportPhone"
                    name="supportPhone"
                    value={generalSettings.supportPhone}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                      <SelectItem value="Australia/Sydney">Australian Eastern Time (AET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={generalSettings.dateFormat} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, dateFormat: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="MMM D, YYYY">MMM D, YYYY</SelectItem>
                      <SelectItem value="D MMM YYYY">D MMM YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Textarea
                  id="companyAddress"
                  name="companyAddress"
                  value={generalSettings.companyAddress}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Server Settings
              </CardTitle>
              <CardDescription>
                Configure the email server settings for system notifications and user communications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    name="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    value={emailSettings.senderName}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input
                    id="senderEmail"
                    name="senderEmail"
                    value={emailSettings.senderEmail}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableEmailQueue"
                  checked={emailSettings.enableEmailQueue}
                  onCheckedChange={() => toggleEmailSetting('enableEmailQueue')}
                />
                <Label htmlFor="enableEmailQueue">Enable email queue for better performance</Label>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Test Email Configuration:</strong> You can test your email settings by sending a test email to your admin address.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Send Test Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security settings to protect your platform and user data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    name="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={handleSecurityChange}
                  />
                  <p className="text-xs text-gray-500">Set to 0 for no expiry</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minPasswordLength">Minimum Password Length</Label>
                  <Input
                    id="minPasswordLength"
                    name="minPasswordLength"
                    type="number"
                    value={securitySettings.minPasswordLength}
                    onChange={handleSecurityChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    name="maxLoginAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={handleSecurityChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={() => toggleSecuritySetting('twoFactorAuth')}
                  />
                  <Label htmlFor="twoFactorAuth">Enable Two-Factor Authentication for admin users</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="requireSpecialChars"
                    checked={securitySettings.requireSpecialChars}
                    onCheckedChange={() => toggleSecuritySetting('requireSpecialChars')}
                  />
                  <Label htmlFor="requireSpecialChars">Require special characters in passwords</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allowedIpRanges">Allowed IP Ranges (admin access)</Label>
                <Textarea
                  id="allowedIpRanges"
                  name="allowedIpRanges"
                  placeholder="Leave blank to allow all IPs, or enter IP ranges (one per line)"
                  value={securitySettings.allowedIpRanges}
                  onChange={handleSecurityChange}
                  rows={3}
                />
                <p className="text-xs text-gray-500">Example: 192.168.1.0/24</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md">
                <p className="text-sm text-amber-800">
                  <strong>Security Notice:</strong> Changes to security settings will be logged and may require users to re-authenticate.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Configure API settings for the email verification service.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rateLimitPerMinute">Rate Limit (per minute)</Label>
                  <Input
                    id="rateLimitPerMinute"
                    name="rateLimitPerMinute"
                    type="number"
                    value={apiSettings.rateLimitPerMinute}
                    onChange={handleApiChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rateLimitPerHour">Rate Limit (per hour)</Label>
                  <Input
                    id="rateLimitPerHour"
                    name="rateLimitPerHour"
                    type="number"
                    value={apiSettings.rateLimitPerHour}
                    onChange={handleApiChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apiKeyExpiry">API Key Expiry (days)</Label>
                  <Input
                    id="apiKeyExpiry"
                    name="apiKeyExpiry"
                    type="number"
                    value={apiSettings.apiKeyExpiry}
                    onChange={handleApiChange}
                  />
                  <p className="text-xs text-gray-500">Set to 0 for no expiry</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableApiKeys"
                    checked={apiSettings.enableApiKeys}
                    onCheckedChange={() => toggleApiSetting('enableApiKeys')}
                  />
                  <Label htmlFor="enableApiKeys">Enable API keys for authentication</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="logApiRequests"
                    checked={apiSettings.logApiRequests}
                    onCheckedChange={() => toggleApiSetting('logApiRequests')}
                  />
                  <Label htmlFor="logApiRequests">Log all API requests</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="allowCors"
                    checked={apiSettings.allowCors}
                    onCheckedChange={() => toggleApiSetting('allowCors')}
                  />
                  <Label htmlFor="allowCors">Allow Cross-Origin Resource Sharing (CORS)</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allowedOrigins">Allowed Origins (CORS)</Label>
                <Textarea
                  id="allowedOrigins"
                  name="allowedOrigins"
                  placeholder="* for all origins, or list origins (one per line)"
                  value={apiSettings.allowedOrigins}
                  onChange={handleApiChange}
                  rows={3}
                />
                <p className="text-xs text-gray-500">Example: https://example.com</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md flex justify-between items-center">
                <p className="text-sm text-blue-800">
                  <strong>API Documentation:</strong> Access to API documentation is currently enabled.
                </p>
                <Button variant="outline" size="sm">
                  View API Docs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellRing className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure system notifications and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => toggleNotificationSetting('emailNotifications')}
                  />
                  <Label htmlFor="emailNotifications">Enable email notifications</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="adminAlerts"
                    checked={notificationSettings.adminAlerts}
                    onCheckedChange={() => toggleNotificationSetting('adminAlerts')}
                  />
                  <Label htmlFor="adminAlerts">Send important system alerts to admin</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="userSignupAlert"
                    checked={notificationSettings.userSignupAlert}
                    onCheckedChange={() => toggleNotificationSetting('userSignupAlert')}
                  />
                  <Label htmlFor="userSignupAlert">New user signup alerts</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="lowCreditAlert"
                    checked={notificationSettings.lowCreditAlert}
                    onCheckedChange={() => toggleNotificationSetting('lowCreditAlert')}
                  />
                  <Label htmlFor="lowCreditAlert">Low credit balance alerts</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="securityAlerts"
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={() => toggleNotificationSetting('securityAlerts')}
                  />
                  <Label htmlFor="securityAlerts">Security alerts (failed logins, etc.)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="weeklyReports"
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={() => toggleNotificationSetting('weeklyReports')}
                  />
                  <Label htmlFor="weeklyReports">Send weekly usage reports</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailTemplate">Email Template</Label>
                <Select 
                  value={notificationSettings.emailTemplate} 
                  onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, emailTemplate: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Test Notification System</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Send a test notification to verify your notification settings are working correctly.
                </p>
                <Button variant="outline" size="sm">
                  Send Test Notification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 