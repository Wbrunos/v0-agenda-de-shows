"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, User, Edit, Trash2 } from "lucide-react"

export function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Master" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Producer" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Manager" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "Band Staff" },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })

  const [isEditing, setIsEditing] = useState(false)

  const roles = ["Master", "Producer", "Manager", "Band Staff", "Driver", "Finance"]

  const getRoleColor = (role: string) => {
    const colors = {
      Master: "bg-red-100 text-red-800",
      Producer: "bg-blue-100 text-blue-800",
      Manager: "bg-green-100 text-green-800",
      "Band Staff": "bg-yellow-100 text-yellow-800",
      Driver: "bg-purple-100 text-purple-800",
      Finance: "bg-indigo-100 text-indigo-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      // Update existing user
      setIsEditing(false)
    } else {
      // Add new user
      const user = {
        id: users.length + 1,
        ...newUser,
      }
      setUsers([...users, user])
    }
    setNewUser({ name: "", email: "", password: "", role: "" })
  }

  const handleEdit = (user: any) => {
    setNewUser({ ...user, password: "" })
    setIsEditing(true)
  }

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
        <p className="text-gray-600">Manage system users and their roles</p>
      </div>

      {/* Add/Edit User Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {isEditing ? "Edit User" : "Add New User"}
          </CardTitle>
          <CardDescription>
            {isEditing ? "Update user information" : "Register a new user in the system"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder={isEditing ? "Leave blank to keep current" : "Enter password"}
                  required={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isEditing ? "Update User" : "Add User"}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setNewUser({ name: "", email: "", password: "", role: "" })
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>{user.role}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-700"
                    disabled={user.role === "Master"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
