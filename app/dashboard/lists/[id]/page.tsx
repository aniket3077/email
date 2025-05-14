"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Plus, Upload, Download, CheckCircle, Trash2, Edit2 } from "lucide-react"

interface Email {
  id: string
  address: string
  status: "valid" | "invalid" | "risky" | "unverified"
  lastVerified: string
}

export default function EmailListDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isAddEmailDialogOpen, setIsAddEmailDialogOpen] = useState(false)
  const [newEmails, setNewEmails] = useState("")
  const [emails, setEmails] = useState<Email[]>([
    {
      id: "1",
      address: "john@example.com",
      status: "valid",
      lastVerified: "2024-03-15"
    },
    {
      id: "2",
      address: "invalid@nonexistent.com",
      status: "invalid",
      lastVerified: "2024-03-15"
    },
    {
      id: "3",
      address: "info@company.com",
      status: "risky",
      lastVerified: "2024-03-15"
    }
  ])

  const handleAddEmails = () => {
    const emailList = newEmails
      .split("\n")
      .map(email => email.trim())
      .filter(email => email && email.includes("@"))

    if (emailList.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one valid email address",
        variant: "destructive"
      })
      return
    }

    const newEmailObjects: Email[] = emailList.map(email => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      address: email,
      status: "unverified",
      lastVerified: new Date().toISOString().split("T")[0]
    }))

    setEmails([...emails, ...newEmailObjects])
    setNewEmails("")
    setIsAddEmailDialogOpen(false)
    toast({
      title: "Success",
      description: `${emailList.length} email(s) added to the list`
    })
  }

  const handleDeleteEmail = (id: string) => {
    setEmails(emails.filter(email => email.id !== id))
    toast({
      title: "Success",
      description: "Email removed from the list"
    })
  }

  const getStatusColor = (status: Email["status"]) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800"
      case "invalid":
        return "bg-red-100 text-red-800"
      case "risky":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Marketing Contacts</h1>
          <p className="text-gray-500">Manage your email list and contacts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">List Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Emails</p>
              <p className="text-2xl font-bold">{emails.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Valid Emails</p>
              <p className="text-2xl font-bold text-green-600">
                {emails.filter(e => e.status === "valid").length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Verified</p>
              <p className="text-2xl font-bold">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" onClick={() => setIsAddEmailDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Emails
            </Button>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Import List
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Button variant="outline" className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify All
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">List Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">List Name</p>
              <p className="font-medium">Marketing Contacts</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium">Main marketing email list</p>
            </div>
            <Button variant="outline" className="w-full">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit List Details
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email List</CardTitle>
          <CardDescription>
            Manage and verify your email contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Verified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((email) => (
                <TableRow key={email.id}>
                  <TableCell className="font-medium">{email.address}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(email.status)}>
                      {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{email.lastVerified}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEmail(email.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddEmailDialogOpen} onOpenChange={setIsAddEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Emails</DialogTitle>
            <DialogDescription>
              Add one or more email addresses to your list. Enter one email per line.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              value={newEmails}
              onChange={(e) => setNewEmails(e.target.value)}
              placeholder="Enter email addresses (one per line)"
              rows={5}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEmails}>Add Emails</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 