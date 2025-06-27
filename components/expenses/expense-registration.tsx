"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Upload,
  Receipt,
  Trash2,
  Camera,
  FileImage,
  Calendar,
  FileText,
  Fuel,
  Utensils,
  Cookie,
  Car,
  Wrench,
  MoreHorizontal,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface Expense {
  id: number
  type: string
  description: string
  value: number
  date: string
  receiptUrl?: string
  receiptName?: string
  showId: number
  showTitle: string
  userId: string
  userName: string
  createdAt: string
}

interface Show {
  id: number
  title: string
  artist: string
  date: string
  city: string
}

export function ExpenseRegistration() {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      type: "fuel",
      description: "Abastecimento na BR-101",
      value: 350.0,
      date: "2024-01-15",
      receiptUrl: "/receipts/fuel-001.jpg",
      receiptName: "fuel-receipt-001.jpg",
      showId: 1,
      showTitle: "Rock in Rio 2024 - Coldplay",
      userId: "1",
      userName: "João Silva",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      type: "meal",
      description: "Almoço da equipe em restaurante",
      value: 180.0,
      date: "2024-01-15",
      showId: 1,
      showTitle: "Rock in Rio 2024 - Coldplay",
      userId: "1",
      userName: "João Silva",
      createdAt: "2024-01-15T14:20:00Z",
    },
  ])

  const [newExpense, setNewExpense] = useState({
    type: "",
    description: "",
    value: "",
    date: "",
    showId: "",
    receiptFile: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  // Mock shows data - replace with real data from Supabase
  const shows: Show[] = [
    { id: 1, title: "Rock in Rio 2024", artist: "Coldplay", date: "2024-01-15", city: "Rio de Janeiro" },
    { id: 2, title: "Turnê Acústica", artist: "Ed Sheeran", date: "2024-01-20", city: "São Paulo" },
    { id: 3, title: "Festival de Verão", artist: "Anitta", date: "2024-01-25", city: "Salvador" },
  ]

  const expenseTypes = [
    { value: "fuel", label: "Combustível", icon: Fuel, color: "bg-red-100 text-red-800" },
    { value: "meal", label: "Refeição", icon: Utensils, color: "bg-green-100 text-green-800" },
    { value: "snack", label: "Lanche", icon: Cookie, color: "bg-yellow-100 text-yellow-800" },
    { value: "toll", label: "Pedágio", icon: Car, color: "bg-blue-100 text-blue-800" },
    { value: "repair", label: "Reparo", icon: Wrench, color: "bg-purple-100 text-purple-800" },
    { value: "other", label: "Outros", icon: MoreHorizontal, color: "bg-gray-100 text-gray-800" },
  ]

  // Check if user has permission to access this page
  const hasPermission = () => {
    const allowedRoles = ["Master", "Producer", "Manager", "Band Staff", "Driver"]
    return user?.role && allowedRoles.includes(user.role)
  }

  if (!hasPermission()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="glass-effect border-slate-700 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Acesso Negado</h2>
            <p className="text-slate-400 mb-4">Você não tem permissão para acessar o registro de despesas.</p>
            <p className="text-sm text-slate-500">Roles permitidos: Band Staff, Driver, Manager, Producer, Master</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setNewExpense((prev) => ({ ...prev, receiptFile: file }))
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Upload receipt to Supabase Storage
      let receiptUrl = ""
      let receiptName = ""

      if (newExpense.receiptFile) {
        // Simulate file upload
        receiptUrl = `/receipts/${Date.now()}-${newExpense.receiptFile.name}`
        receiptName = newExpense.receiptFile.name

        // TODO: Implement Supabase Storage upload
        // const { data, error } = await supabase.storage
        //   .from('receipts')
        //   .upload(`${user.id}/${Date.now()}-${newExpense.receiptFile.name}`, newExpense.receiptFile)
      }

      const selectedShow = shows.find((show) => show.id.toString() === newExpense.showId)

      const expense: Expense = {
        id: expenses.length + 1,
        type: newExpense.type,
        description: newExpense.description,
        value: Number.parseFloat(newExpense.value),
        date: newExpense.date,
        receiptUrl,
        receiptName,
        showId: Number.parseInt(newExpense.showId),
        showTitle: selectedShow ? `${selectedShow.title} - ${selectedShow.artist}` : "",
        userId: user?.id || "1",
        userName: user?.name || "Usuário",
        createdAt: new Date().toISOString(),
      }

      setExpenses([expense, ...expenses])

      // Reset form
      setNewExpense({
        type: "",
        description: "",
        value: "",
        date: "",
        showId: "",
        receiptFile: null,
      })

      // TODO: Save to Supabase
      // const { error } = await supabase.from('expenses').insert([expense])
    } catch (error) {
      console.error("Error submitting expense:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTypeInfo = (type: string) => {
    return expenseTypes.find((t) => t.value === type) || expenseTypes[expenseTypes.length - 1]
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Registro de Despesas</h1>
            <p className="text-slate-400">Registre gastos durante as turnês e shows</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">{formatCurrency(totalExpenses)}</div>
              <div className="text-sm text-slate-400">Total de Despesas</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Registration Form */}
          <div className="xl:col-span-1">
            <Card className="glass-effect border-slate-700 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Plus className="h-5 w-5 text-blue-400" />
                  Nova Despesa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Expense Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-slate-200">
                      Tipo de Despesa *
                    </Label>
                    <Select
                      value={newExpense.type}
                      onValueChange={(value) => setNewExpense((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {expenseTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <SelectItem key={type.value} value={type.value} className="text-white">
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Show Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="show" className="text-slate-200">
                      Show Relacionado *
                    </Label>
                    <Select
                      value={newExpense.showId}
                      onValueChange={(value) => setNewExpense((prev) => ({ ...prev, showId: value }))}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Selecione o show" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {shows.map((show) => (
                          <SelectItem key={show.id} value={show.id.toString()} className="text-white">
                            <div className="flex flex-col">
                              <span className="font-medium">{show.title}</span>
                              <span className="text-xs text-slate-400">
                                {show.artist} - {show.city}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Value and Date */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="value" className="text-slate-200">
                        Valor (R$) *
                      </Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        value={newExpense.value}
                        onChange={(e) => setNewExpense((prev) => ({ ...prev, value: e.target.value }))}
                        placeholder="0,00"
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-slate-200">
                        Data *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense((prev) => ({ ...prev, date: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-slate-200">
                      Descrição *
                    </Label>
                    <Textarea
                      id="description"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Descreva a despesa..."
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[80px]"
                      required
                    />
                  </div>

                  {/* Receipt Upload */}
                  <div className="space-y-2">
                    <Label className="text-slate-200">Comprovante (Foto)</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive ? "border-blue-400 bg-blue-400/10" : "border-slate-600 hover:border-slate-500"
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        className="hidden"
                        id="receipt-upload"
                      />

                      {newExpense.receiptFile ? (
                        <div className="space-y-2">
                          <FileImage className="h-8 w-8 text-green-400 mx-auto" />
                          <p className="text-sm text-green-400 font-medium">{newExpense.receiptFile.name}</p>
                          <p className="text-xs text-slate-400">
                            {(newExpense.receiptFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setNewExpense((prev) => ({ ...prev, receiptFile: null }))}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remover
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-center gap-2">
                            <Camera className="h-6 w-6 text-slate-400" />
                            <Upload className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-sm text-slate-300">
                            Arraste uma foto ou{" "}
                            <label
                              htmlFor="receipt-upload"
                              className="text-blue-400 hover:text-blue-300 cursor-pointer underline"
                            >
                              clique para selecionar
                            </label>
                          </p>
                          <p className="text-xs text-slate-500">PNG, JPG até 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Receipt className="mr-2 h-4 w-4" />
                        Registrar Despesa
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Expenses List */}
          <div className="xl:col-span-2">
            <Card className="glass-effect border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Receipt className="h-5 w-5 text-green-400" />
                  Despesas Registradas ({expenses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {expenses.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">Nenhuma despesa registrada</p>
                    <p className="text-sm">Registre sua primeira despesa usando o formulário ao lado</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {expenses.map((expense) => {
                      const typeInfo = getTypeInfo(expense.type)
                      const Icon = typeInfo.icon

                      return (
                        <div
                          key={expense.id}
                          className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700/70 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-blue-400" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <Badge className={typeInfo.color} variant="secondary">
                                    {typeInfo.label}
                                  </Badge>
                                  <span className="text-lg font-semibold text-white">
                                    {formatCurrency(expense.value)}
                                  </span>
                                </div>

                                <p className="text-slate-200 font-medium mb-1">{expense.description}</p>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{formatDate(expense.date)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span className="truncate max-w-[200px]">{expense.showTitle}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span>Por: {expense.userName}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {expense.receiptUrl && (
                                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                  <FileImage className="h-4 w-4 mr-1" />
                                  Ver Comprovante
                                </Button>
                              )}

                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
