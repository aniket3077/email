"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Pencil, Trash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample user data
const initialUsers = [
  { id: 1, name: "Pat Black", mail: "Pat.Black@gmail.com", username: "patblack", password: "1234", subscription: "Premium" },
  { id: 2, name: "Sarah Johnson", mail: "sarah.j@example.com", username: "sarahj", password: "1234", subscription: "Basic" },
  { id: 3, name: "Michael Rodriguez", mail: "mike.rod@example.com", username: "mikerod", password: "1234", subscription: "Premium" },
  { id: 4, name: "Emma Wilson", mail: "emma.w@example.com", username: "emmaw", password: "1234", subscription: "Basic" },
  { id: 5, name: "James Smith", mail: "james.smith@example.com", username: "jsmith", password: "1234", subscription: "Premium" },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [newUser, setNewUser] = useState({ name: "", mail: "", username: "", password: "", subscription: "Basic" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<null | typeof initialUsers[0]>(null)

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle adding a new user
  const handleAddUser = () => {
    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((user) => (user.id === editingUser.id ? { ...newUser, id: editingUser.id } : user))
      )
    } else {
      // Add new user
      setUsers([...users, { ...newUser, id: users.length + 1 }])
    }
    setNewUser({ name: "", mail: "", username: "", password: "", subscription: "Basic" })
    setEditingUser(null)
    setIsDialogOpen(false)
  }

  // Handle opening the edit dialog
  const handleEditClick = (user: typeof initialUsers[0]) => {
    setEditingUser(user)
    setNewUser({ ...user })
    setIsDialogOpen(true)
  }

  // Handle deleting a user
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage users and permissions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0">
              <Plus className="mr-2 h-4 w-4" /> 
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? "Update user information in the form below."
                  : "Fill in the user information below to create a new user account."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mail" className="text-right">
                  Email
                </Label>
                <Input
                  id="mail"
                  type="email"
                  value={newUser.mail}
                  onChange={(e) => setNewUser({ ...newUser, mail: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subscription" className="text-right">
                  Subscription
                </Label>
                <select
                  id="subscription"
                  value={newUser.subscription}
                  onChange={(e) => setNewUser({ ...newUser, subscription: e.target.value })}
                  className="col-span-3 h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsDialogOpen(false)
                setEditingUser(null)
                setNewUser({ name: "", mail: "", username: "", password: "", subscription: "Basic" })
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>{editingUser ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
        <Search className="ml-3 h-4 w-4 text-muted-foreground shrink-0" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <button 
          onClick={() => setSearchQuery("")}
          className={`px-3 text-sm text-muted-foreground hover:text-foreground ${!searchQuery && "hidden"}`}>
          Clear
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Mail</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.mail}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.subscription}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditClick(user)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No users found. Try a different search term.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 