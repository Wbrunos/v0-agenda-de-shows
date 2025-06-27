"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload, Receipt, Trash2 } from "lucide-react"

export function TravelExpenses() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      type: "fuel",
      description: "Gas station fill-up",
      value: 85.5,
      date: "2024-01-15",
      show: "The Midnight - Blue Note",
      receipt: null,
    },
    {
      id: 2,
      type: "meal",
      description: "Team dinner",
      value: 120.0,
      date: "2024-01-15",
      show: "The Midnight - Blue Note",
      receipt: null,
    },
  ])

  const [newExpense, setNewExpense] = useState({
    type: "",
    description: "",
    value: "",
    date: "",
    show: "",
    receipt: null,
  })

  const expenseTypes = [
    { value: "fuel", label: "Fuel" },
    { value: "meal", label: "Meal" },
    { value: "snack", label: "Snack" },
    { value: "part", label: "Vehicle Part" },
    { value: "toll", label: "Toll" },
    { value: "other", label: "Other" },
  ]

  const shows = ["The Midnight - Blue Note", "Synthwave Dreams - Electric Ballroom"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const expense = {
      id: expenses.length + 1,
      ...newExpense,
      value: Number.parseFloat(newExpense.value),
    }
    setExpenses([...expenses, expense])
    setNewExpense({
      type: "",
      description: "",
      value: "",
      date: "",
      show: "",
      receipt: null,
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: Upload to Supabase Storage
      setNewExpense((prev) => ({ ...prev, receipt: file.name }))
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      fuel: "bg-red-100 text-red-800",
      meal: "bg-green-100 text-green-800",
      snack: "bg-yellow-100 text-yellow-800",
      part: "bg-blue-100 text-blue-800",
      toll: "bg-purple-100 text-purple-800",
      other: "bg-gray-100 text-gray-800",
    }
    return colors[type] || colors.other
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Travel Expenses</h2>
        <p className="text-gray-600">Track expenses while on tour</p>
      </div>

      {/* Add Expense Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Expense
          </CardTitle>
          <CardDescription>Record a new travel expense</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newExpense.type}
                  onValueChange={(value) => setNewExpense((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select expense type" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Value ($)</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  value={newExpense.value}
                  onChange={(e) => setNewExpense((prev) => ({ ...prev, value: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense((prev) => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="show">Related Show</Label>
                <Select
                  value={newExpense.show}
                  onValueChange={(value) => setNewExpense((prev) => ({ ...prev, show: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select show" />
                  </SelectTrigger>
                  <SelectContent>
                    {shows.map((show) => (
                      <SelectItem key={show} value={show}>
                        {show}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newExpense.description}
                onChange={(e) => setNewExpense((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the expense..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt">Receipt Photo</Label>
              <div className="upload-area">
                <input id="receipt" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <label htmlFor="receipt" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {newExpense.receipt ? newExpense.receipt : "Click to upload receipt photo"}
                  </p>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Your recorded travel expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(expense.type)}`}>
                        {expenseTypes.find((t) => t.value === expense.type)?.label}
                      </span>
                      <span className="font-medium">${expense.value.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{expense.description}</p>
                    <p className="text-xs text-gray-500">{expense.show}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{new Date(expense.date).toLocaleDateString()}</p>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
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
