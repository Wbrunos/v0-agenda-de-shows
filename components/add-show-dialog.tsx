"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Music, DollarSign, Users } from "lucide-react"

interface Artist {
  id: number
  name: string
  genre: string
  color: string
}

interface AddShowDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  artists: Artist[]
  onAddShow: (showData: any) => void
}

export function AddShowDialog({ open, onOpenChange, artists, onAddShow }: AddShowDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    date: "",
    time: "",
    venue: "",
    city: "",
    price: "",
    capacity: "",
    description: "",
    status: "pending",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const showData = {
      ...formData,
      price: `R$ ${formData.price}`,
      capacity: Number.parseInt(formData.capacity),
      sold: 0,
      observation: formData.description,
    }

    onAddShow(showData)
    onOpenChange(false)

    // Reset form
    setFormData({
      title: "",
      artist: "",
      date: "",
      time: "",
      venue: "",
      city: "",
      price: "",
      capacity: "",
      description: "",
      status: "pending",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-slate-800 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Music className="h-6 w-6 text-blue-400" />
            Adicionar Novo Show
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-200">
                Título do Show *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Nome do evento"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist" className="text-slate-200">
                Artista *
              </Label>
              <Select value={formData.artist} onValueChange={(value) => handleChange("artist", value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Selecione um artista" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {artists.map((artist) => (
                    <SelectItem key={artist.id} value={artist.name} className="text-white hover:bg-slate-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: artist.color }}></div>
                        <span>{artist.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-slate-200 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data *
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
              <Label htmlFor="time" className="text-slate-200 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horário *
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

            <div className="space-y-2">
              <Label htmlFor="venue" className="text-slate-200 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Local *
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

            <div className="space-y-2">
              <Label htmlFor="city" className="text-slate-200">
                Cidade *
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Cidade do evento"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-slate-200 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Preço do Ingresso (R$)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-slate-200 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Capacidade
              </Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Número de lugares"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="status" className="text-slate-200">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Status do show" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="pending" className="text-white hover:bg-slate-600">
                    Pendente
                  </SelectItem>
                  <SelectItem value="confirmed" className="text-white hover:bg-slate-600">
                    Confirmado
                  </SelectItem>
                  <SelectItem value="cancelled" className="text-white hover:bg-slate-600">
                    Cancelado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-slate-200">
                Observações
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Informações adicionais sobre o show..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Adicionar Show
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
