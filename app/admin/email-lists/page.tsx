"use client"

import { useState, useEffect } from "react"
import { 
  RefreshCw, Search, Upload, Download, Plus, 
  Trash2, Edit, Eye, Filter, ArrowUpDown 
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
  TableRow,
} from "@/components/ui/table"
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"

// Mock data for email lists
const mockEmailLists = [
  { 
    id: "list1", 
    name: "Marketing Leads", 
    description: "Potential customers from marketing campaigns",
    totalEmails: 5280, 
    validEmails: 4850,
    lastUpdated: "2023-08-15T14:30:00Z",
    createdBy: "admin@example.com"
  },
  { 
    id: "list2", 
    name: "Newsletter Subscribers", 
    description: "Active newsletter subscribers",
    totalEmails: 12750, 
    validEmails: 12480,
    lastUpdated: "2023-08-14T09:15:00Z",
    createdBy: "marketing@example.com"
  },
  { 
    id: "list3", 
    name: "Customer Database", 
    description: "All current customers",
    totalEmails: 3450, 
    validEmails: 3390,
    lastUpdated: "2023-08-16T11:45:00Z",
    createdBy: "sales@example.com"
  },
  { 
    id: "list4", 
    name: "Event Attendees", 
    description: "People who registered for our conference",
    totalEmails: 870, 
    validEmails: 840,
    lastUpdated: "2023-08-10T16:20:00Z",
    createdBy: "events@example.com"
  },
  { 
    id: "list5", 
    name: "Cold Outreach", 
    description: "Potential B2B clients for outreach",
    totalEmails: 1560, 
    validEmails: 1320,
    lastUpdated: "2023-08-12T10:40:00Z",
    createdBy: "sales@example.com"
  }
];

// Formatting utilities
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export default function EmailListsPage() {
  const { token } = useAuth()
  const [emailLists, setEmailLists] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewListDialog, setShowNewListDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [newListData, setNewListData] = useState({
    name: "",
    description: "",
    emails: ""
  })
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importType, setImportType] = useState<"new" | "existing">("new")
  const [targetListId, setTargetListId] = useState<string | null>(null)

  // Fetch email lists data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // In a real app, you would fetch from an API
        // For now, use mock data after a simulated delay
        await new Promise(resolve => setTimeout(resolve, 800))
        setEmailLists(mockEmailLists)
      } catch (error) {
        console.error("Error fetching email lists:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [token])

  // Filter email lists based on search query
  const filteredLists = emailLists.filter(list => 
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    list.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort email lists based on column and direction
  const sortedLists = [...filteredLists].sort((a, b) => {
    let comparison = 0
    
    switch (sortColumn) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "totalEmails":
        comparison = a.totalEmails - b.totalEmails
        break
      case "validEmails":
        comparison = a.validEmails - b.validEmails
        break
      case "lastUpdated":
        comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        break
      default:
        comparison = 0
    }
    
    return sortDirection === "asc" ? comparison : -comparison
  })

  // Handle form submission for new list
  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newListData.name) return
    
    // Extract emails from textarea and count them
    const emails = newListData.emails
      .split(/[\n,]/)
      .map(email => email.trim())
      .filter(email => email.length > 0 && email.includes('@'))
    
    // Create new list
    const newList = {
      id: `list${Date.now()}`,
      name: newListData.name,
      description: newListData.description,
      totalEmails: emails.length,
      validEmails: Math.round(emails.length * 0.95), // Simulate validation
      lastUpdated: new Date().toISOString(),
      createdBy: "admin@example.com"
    }
    
    // Add to state
    setEmailLists([...emailLists, newList])
    
    // Reset form
    setNewListData({
      name: "",
      description: "",
      emails: ""
    })
    
    // Close dialog
    setShowNewListDialog(false)
  }

  // Handle file import
  const handleImport = async () => {
    if (!selectedFile) return
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    if (importType === "new") {
      // Create a new list from the imported file
      const newList = {
        id: `list${Date.now()}`,
        name: selectedFile.name.replace(/\.\w+$/, ''),
        description: `Imported from ${selectedFile.name}`,
        totalEmails: Math.floor(Math.random() * 2000) + 500,
        validEmails: Math.floor(Math.random() * 1800) + 400,
        lastUpdated: new Date().toISOString(),
        createdBy: "admin@example.com"
      }
      
      setEmailLists([...emailLists, newList])
    } else if (importType === "existing" && targetListId) {
      // Update existing list
      const updatedLists = emailLists.map(list => {
        if (list.id === targetListId) {
          const newTotal = list.totalEmails + Math.floor(Math.random() * 500) + 100
          return {
            ...list,
            totalEmails: newTotal,
            validEmails: Math.floor(newTotal * 0.95),
            lastUpdated: new Date().toISOString()
          }
        }
        return list
      })
      
      setEmailLists(updatedLists)
    }
    
    // Reset state
    setSelectedFile(null)
    setImportType("new")
    setTargetListId(null)
    setShowImportDialog(false)
  }

  // Handle list deletion
  const handleDeleteList = (listId: string) => {
    setEmailLists(emailLists.filter(list => list.id !== listId))
  }

  // Handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Email Lists</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowImportDialog(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Lists</CardTitle>
            <CardDescription>All managed email lists</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading ? "..." : emailLists.length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Emails</CardTitle>
            <CardDescription>Across all lists</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading 
                ? "..." 
                : emailLists.reduce((sum, list) => sum + list.totalEmails, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Valid Emails</CardTitle>
            <CardDescription>Verified deliverable</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading 
                ? "..." 
                : emailLists.reduce((sum, list) => sum + list.validEmails, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search lists..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" onClick={() => setShowNewListDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New List
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                  List Name
                  {sortColumn === "name" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead onClick={() => handleSort("totalEmails")} className="cursor-pointer text-right">
                  Total Emails
                  {sortColumn === "totalEmails" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort("validEmails")} className="cursor-pointer text-right">
                  Valid Emails
                  {sortColumn === "validEmails" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort("lastUpdated")} className="cursor-pointer">
                  Last Updated
                  {sortColumn === "lastUpdated" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
                    <p className="text-sm text-gray-500 mt-2">Loading email lists...</p>
                  </TableCell>
                </TableRow>
              ) : sortedLists.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-sm text-gray-500">No email lists found</p>
                  </TableCell>
                </TableRow>
              ) : (
                sortedLists.map((list) => (
                  <TableRow key={list.id}>
                    <TableCell className="font-medium">{list.name}</TableCell>
                    <TableCell className="max-w.xs truncate">{list.description}</TableCell>
                    <TableCell className="text-right">{list.totalEmails.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className={list.validEmails / list.totalEmails > 0.95 ? "text-green-600" : "text-amber-600"}>
                        {list.validEmails.toLocaleString()} 
                        <span className="text-xs text-gray-500 ml-1">
                          ({Math.round(list.validEmails / list.totalEmails * 100)}%)
                        </span>
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(list.lastUpdated)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Manage List</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit List
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteList(list.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete List
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Dialog for creating a new list */}
      <Dialog open={showNewListDialog} onOpenChange={setShowNewListDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Email List</DialogTitle>
            <DialogDescription>
              Create a new list and add emails manually or by import.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreateList}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="list-name">List Name</Label>
                <Input
                  id="list-name"
                  placeholder="e.g., Marketing Contacts"
                  value={newListData.name}
                  onChange={(e) => setNewListData({ ...newListData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="list-description">Description (Optional)</Label>
                <Input
                  id="list-description"
                  placeholder="e.g., Leads from Q3 campaign"
                  value={newListData.description}
                  onChange={(e) => setNewListData({ ...newListData, description: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="list-emails">
                  Emails (Optional, one per line or comma separated)
                </Label>
                <Textarea
                  id="list-emails"
                  placeholder="john@example.com&#10;jane@example.com"
                  rows={8}
                  value={newListData.emails}
                  onChange={(e) => setNewListData({ ...newListData, emails: e.target.value })}
                />
                <p className="text-xs text-gray-500">
                  You can also import emails later from a CSV or TXT file.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowNewListDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Create List</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for importing emails */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Emails</DialogTitle>
            <DialogDescription>
              Import emails from a CSV, Excel, or TXT file.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Import Type</Label>
              <div className="flex gap-4">
                <Label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={importType === "new"}
                    onChange={() => setImportType("new")}
                    className="h-4 w-4"
                  />
                  <span>Create new list</span>
                </Label>
                <Label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={importType === "existing"}
                    onChange={() => setImportType("existing")}
                    className="h-4 w-4"
                  />
                  <span>Add to existing list</span>
                </Label>
              </div>
            </div>
            
            {importType === "existing" && (
              <div className="space-y-2">
                <Label htmlFor="target-list">Select List</Label>
                <select
                  id="target-list"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  value={targetListId || ""}
                  onChange={(e) => setTargetListId(e.target.value)}
                >
                  <option value="">Select a list...</option>
                  {emailLists.map(list => (
                    <option key={list.id} value={list.id}>
                      {list.name} ({list.totalEmails.toLocaleString()} emails)
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="file-upload">Select File</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                {selectedFile ? (
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setSelectedFile(null)}
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm font-medium">
                      Drag & drop a file here, or click to browse
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Supports CSV, Excel, and TXT files up to 10MB
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".csv,.xlsx,.txt"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedFile(e.target.files[0])
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Browse Files
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={!selectedFile || (importType === "existing" && !targetListId)}
            >
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 