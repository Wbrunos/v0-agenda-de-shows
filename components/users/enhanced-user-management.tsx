"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Mail, Shield, UserCog } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface EnhancedUser {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  createdAt: string
}

export function EnhancedUserManagement() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<EnhancedUser[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@ags.com",
      role: "Master",
      status: "active",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@ags.com",
      role: "Producer",
      status: "active",
      createdAt: "2024-01-05",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@ags.com",
      role: "Manager",
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@ags.com",
      role: "Band Staff",
      status: "active",
      createdAt: "2024-01-12",
    },
    {
      id: "5",
      name: "Tom Brown",
      email: "tom@ags.com",
      role: "Driver",
      status: "inactive",
      createdAt: "2024-01-08",
    },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })

  const [editingUser, setEditingUser] = useState<EnhancedUser | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const roles = [
    { value: "Master", label: "Master", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
    { value: "Producer", label: "Producer", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { value: "Manager", label: "Manager", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
    {
      value: "Band Staff",
      label: "Band Staff",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    },
    {
      value: "Driver",
      label: "Driver",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    },
    {
      value: "Finance",
      label: "Finance",
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    },
  ]

  const getRoleInfo = (role: string) => {
    return roles.find((r) => r.value === role) || roles[0]
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, name: newUser.name, email: newUser.email, role: newUser.role } : user,
        ),
      )
    } else {
      // Add new user
      const user: EnhancedUser = {
        id: (users.length + 1).toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setUsers([...users, user])
    }

    // Reset form
    setNewUser({ name: "", email: "", password: "", role: "" })
    setEditingUser(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (user: EnhancedUser) => {
    setNewUser({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    })
    setEditingUser(user)
    setIsDialogOpen(true)
  }

  const handleDelete = (userId: string) => {
    if (userId === currentUser?.id) return // Can't delete yourself
    setUsers(users.filter((user) => user.id !== userId))
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  return (
    <div className="space-y-6 bg-[#0f0f0f] min-h-screen p-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
        <p className="text-gray-400">Manage system users and their roles</p>
      </div>

      {/* Filters and Add User */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1f1f1f] border-gray-700 text-white placeholder:text-gray-500 max-w-xs"
          />
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="bg-[#1f1f1f] border-gray-700 text-white w-40">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent className="bg-[#1f1f1f] border-gray-700">
              <SelectItem value="all" className="text-white">
                All Roles
              </SelectItem>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value} className="text-white">
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
              onClick={() => {
                setNewUser({ name: "", email: "", password: "", role: "" })
                setEditingUser(null)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-[#1f1f1f] border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl">{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingUser ? "Update user information" : "Create a new user account"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    className="bg-[#0f0f0f] border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    className="bg-[#0f0f0f] border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder={editingUser ? "Leave blank to keep current" : "Enter password"}
                    className="bg-[#0f0f0f] border-gray-700 text-white"
                    required={!editingUser}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-white">
                    Role
                  </Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger className="bg-[#0f0f0f] border-gray-700 text-white">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1f1f1f] border-gray-700">
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value} className="text-white">
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
                >
                  {editingUser ? "Update User" : "Create User"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Table */}
      <Card className="bg-[#1f1f1f] border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <UserCog className="h-5 w-5 text-blue-400" />
            System Users ({filteredUsers.length})
          </CardTitle>
          <CardDescription className="text-gray-400">Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="h-12 w-12 mx-auto mb-4 opacity-50"></div>
                <p>No users found</p>
              </div>
            ) : (
              filteredUsers.map((user) => {
                const roleInfo = getRoleInfo(user.role)
                const isCurrentUser = user.id === currentUser?.id

                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center">
                        <div className="h-6 w-6 text-white"></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-white">{user.name}</h3>
                          {isCurrentUser && (
                            <Badge variant="outline" className="text-blue-400 border-blue-400">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={roleInfo.color}>
                            <Shield className="h-3 w-3 mr-1" />
                            {user.role}
                          </Badge>
                          <Badge
                            variant={user.status === "active" ? "default" : "secondary"}
                            className={user.status === "active" ? "bg-green-600" : "bg-gray-600"}
                          >
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                        className="text-gray-400 hover:text-white hover:bg-gray-800"
                        disabled={isCurrentUser}
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(user)}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        disabled={isCurrentUser || user.role === "Master"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
