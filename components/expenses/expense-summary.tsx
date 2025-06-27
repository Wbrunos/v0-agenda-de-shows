"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  Fuel,
  Utensils,
  Cookie,
  Car,
  Wrench,
  MoreHorizontal,
} from "lucide-react"

interface ExpenseSummaryProps {
  expenses: Array<{
    id: number
    type: string
    value: number
    date: string
    showId: number
  }>
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const expenseTypes = [
    { value: "fuel", label: "Combustível", icon: Fuel, color: "bg-red-100 text-red-800" },
    { value: "meal", label: "Refeição", icon: Utensils, color: "bg-green-100 text-green-800" },
    { value: "snack", label: "Lanche", icon: Cookie, color: "bg-yellow-100 text-yellow-800" },
    { value: "toll", label: "Pedágio", icon: Car, color: "bg-blue-100 text-blue-800" },
    { value: "repair", label: "Reparo", icon: Wrench, color: "bg-purple-100 text-purple-800" },
    { value: "other", label: "Outros", icon: MoreHorizontal, color: "bg-gray-100 text-gray-800" },
  ]

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0)

  const expensesByType = expenseTypes
    .map((type) => {
      const typeExpenses = expenses.filter((expense) => expense.type === type.value)
      const total = typeExpenses.reduce((sum, expense) => sum + expense.value, 0)
      return {
        ...type,
        total,
        count: typeExpenses.length,
        percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0,
      }
    })
    .filter((type) => type.count > 0)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // Calculate trends (mock data for demonstration)
  const lastMonthTotal = totalExpenses * 0.85 // Simulate 15% increase
  const trend = ((totalExpenses - lastMonthTotal) / lastMonthTotal) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Expenses */}
      <Card className="glass-effect border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-200">Total de Despesas</CardTitle>
          <DollarSign className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalExpenses)}</div>
          <div className="flex items-center text-xs">
            {trend >= 0 ? (
              <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
            )}
            <span className={trend >= 0 ? "text-red-500" : "text-green-500"}>
              {Math.abs(trend).toFixed(1)}% vs mês anterior
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Number of Expenses */}
      <Card className="glass-effect border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-200">Número de Despesas</CardTitle>
          <Receipt className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{expenses.length}</div>
          <p className="text-xs text-slate-400">Registros este mês</p>
        </CardContent>
      </Card>

      {/* Top Expense Categories */}
      <Card className="glass-effect border-slate-700 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-200">Despesas por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expensesByType.slice(0, 3).map((type) => {
              const Icon = type.icon
              return (
                <div key={type.value} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-200">{type.label}</span>
                    <Badge className={type.color} variant="secondary">
                      {type.count}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{formatCurrency(type.total)}</div>
                    <div className="text-xs text-slate-400">{type.percentage.toFixed(1)}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
