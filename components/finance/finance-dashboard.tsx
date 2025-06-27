"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function FinanceDashboard() {
  // Mock data - replace with real data from Supabase
  const expensesByCategory = [
    { name: "Fuel", value: 2400, color: "#EF4444" },
    { name: "Meals", value: 1800, color: "#10B981" },
    { name: "Tolls", value: 600, color: "#8B5CF6" },
    { name: "Parts", value: 800, color: "#F59E0B" },
    { name: "Other", value: 400, color: "#6B7280" },
  ]

  const expensesByArtist = [
    { name: "The Midnight", expenses: 3200 },
    { name: "Synthwave Dreams", expenses: 2800 },
    { name: "Neon Nights", expenses: 2000 },
  ]

  const kpis = {
    weekly: 1250,
    monthly: 5200,
    total: 18400,
    weeklyChange: -8.5,
    monthlyChange: 12.3,
  }

  const COLORS = ["#EF4444", "#10B981", "#8B5CF6", "#F59E0B", "#6B7280"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Finance Dashboard</h2>
          <p className="text-gray-600">Track expenses and financial metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by artist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Artists</SelectItem>
              <SelectItem value="midnight">The Midnight</SelectItem>
              <SelectItem value="synthwave">Synthwave Dreams</SelectItem>
              <SelectItem value="neon">Neon Nights</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="gradient-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${kpis.weekly}</div>
            <div className="flex items-center text-xs">
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              <span className="text-red-500">{Math.abs(kpis.weeklyChange)}% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${kpis.monthly}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">{kpis.monthlyChange}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${kpis.total}</div>
            <p className="text-xs text-gray-600">All time expenses</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Breakdown of expense types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by Artist</CardTitle>
            <CardDescription>Total expenses per artist</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expensesByArtist}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Expenses"]} />
                  <Bar dataKey="expenses" fill="url(#gradient)" />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#764ba2" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
