"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddShowDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function AddShowDialog({ isOpen, onClose }: AddShowDialogProps) {
  const [formData, setFormData] = useState({
    artist: "",
    venue: "",
    date: "",
    time: "",
    city: "",
    value: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar o show
    console.log("Novo show:", formData)
    onClose()
    // Reset form
    setFormData({
      artist: "",
      venue: "",
      date: "",
      time: "",
      city: "",
      value: "",
      description: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Novo Show</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="artist" className="text-slate-300">
              Artista
            </Label>
            <Select onValueChange={(value) => handleChange("artist", value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600">
                <SelectValue placeholder="Selecione um artista" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="joao-silva">João Silva</SelectItem>
                <SelectItem value="maria-santos">Maria Santos</SelectItem>
                <SelectItem value="pedro-costa">Pedro Costa</SelectItem>
                <SelectItem value="ana-oliveira">Ana Oliveira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue" className="text-slate-300">
              Local
            </Label>
            <Input
              id="venue"
              value={formData.venue}
              onChange={(e) => handleChange("venue", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Nome do local"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-slate-300">
                Data
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-slate-300">
                Horário
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-slate-300">
              Cidade
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Cidade do show"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="value" className="text-slate-300">
              Valor (R$)
            </Label>
            <Input
              id="value"
              value={formData.value}
              onChange={(e) => handleChange("value", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="0,00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">
              Observações
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Informações adicionais..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Salvar Show
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
