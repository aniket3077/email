"use client"

import { useState } from "react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Plus, MoreVertical, Upload, Download, Trash2, Edit2, CheckCircle } from "lucide-react"

interface EmailList {
  id: string
  name: string
  description: string
  emailCount: number
  lastUpdated: string
  status: "verified" | "unverified" | "partial"
}

export default function EmailListsPage() {
  const { toast } = useToast()
  const [lists, setLists] = useState<EmailList[]>([
    {
      id: "1",
      name: "Marketing Contacts",
      description: "Main marketing email list",
      emailCount: 1250,
      lastUpdated: "2024-03-15",
      status: "verified"
    },
    {
      id: "2",
      name: "Newsletter Subscribers",
      description: "Monthly newsletter recipients",
      emailCount: 850,
      lastUpdated: "2024-03-10",
      status: "partial"
    }
  ])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newList, setNewList] = useState({
    name: "",
    description: ""
  })

  const handleCreateList = () => {
    if (!newList.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a list name",
        variant: "destructive"
      })
      return
    }

    const list: EmailList = {
      id: Date.now().toString(),
      name: newList.name,
      description: newList.description,
      emailCount: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      status: "unverified"
    }

    setLists([...lists, list])
    setNewList({ name: "", description: "" })
    setIsCreateDialogOpen(false)
    toast({
      title: "Success",
      description: "Email list created successfully"
    })
  }

  const handleDeleteList = (id: string) => {
    setLists(lists.filter(list => list.id !== id))
    toast({
      title: "Success",
      description: "Email list deleted successfully"
    })
  }

  const getStatusColor = (status: EmailList["status"]) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "unverified":
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Email Lists</h1>
          <p className="text-gray-500">Manage your email lists and contacts</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New List
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Email List</DialogTitle>
              <DialogDescription>
                Create a new list to organize your email contacts
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  List Name
                </label>
                <Input
                  id="name"
                  value={newList.name}
                  onChange={(e) => setNewList({ ...newList, name: e.target.value })}
                  placeholder="Enter list name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={newList.description}
                  onChange={(e) => setNewList({ ...newList, description: e.target.value })}
                  placeholder="Enter list description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateList}>Create List</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {lists.map((list) => (
          <Card key={list.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{list.name}</CardTitle>
                  <CardDescription>{list.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Emails
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Export List
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify List
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit List
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteList(list.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete List
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">{list.emailCount.toLocaleString()}</span> emails
                </div>
                <div>Last updated: {list.lastUpdated}</div>
                <Badge className={getStatusColor(list.status)}>
                  {list.status.charAt(0).toUpperCase() + list.status.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {lists.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No email lists found</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First List
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 