"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Show {
  id: number
  title: string
  artist: string
  date: string
  time: string
  venue: string
  city: string
  status: string
  price: string
  capacity: number
  sold: number
  observation?: string
}

interface EditShowDialogProps {
  show: Show
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateShow: (show: Show) => void
}

export function EditShowDialog({ show, open, onOpenChange, onUpdateShow }: EditShowDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    date: "",
    time: "",
    venue: "",
    city: "",
    status: "pending",
    price: "",
    capacity: "",
    sold: "",
    observation: "",
  })

  useEffect(() => {
    if (show) {
      setFormData({
        title: show.title,
        artist: show.artist,
        date: show.date,
        time: show.time,
        venue: show.venue,
        city: show.city,
        status: show.status,
        price: show.price,
        capacity: show.capacity.toString(),
        sold: show.sold.toString(),
        observation: show.observation || "",
      })
    }
  }, [show])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateShow({
      ...show,
      ...formData,
      capacity: Number.parseInt(formData.capacity),
      sold: Number.parseInt(formData.sold),
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Editar Show</DialogTitle>
          <DialogDescription className="text-slate-400">
            Faça as alterações necessárias nas informações do show.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-200">
                Título do Show
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="artist" className="text-slate-200">
                Artista
              </Label>
              <Input
                id="artist"
                value={formData.artist}
                onChange={(e) => handleChange("artist", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-slate-200">
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
              <Label htmlFor="time" className="text-slate-200">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="venue" className="text-slate-200">
                Local
              </Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => handleChange("venue", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-slate-200">
                Cidade
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-slate-200">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="pending" className="text-white">
                    Pendente
                  </SelectItem>
                  <SelectItem value="confirmed" className="text-white">
                    Confirmado
                  </SelectItem>
                  <SelectItem value="cancelled" className="text-white">
                    Cancelado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="text-slate-200">
                Preço
              </Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-slate-200">
                Capacidade
              </Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sold" className="text-slate-200">
                Vendidos
              </Label>
              <Input
                id="sold"
                type="number"
                value={formData.sold}
                onChange={(e) => handleChange("sold", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observation" className="text-slate-200">
              Observação
            </Label>
            <Textarea
              id="observation"
              value={formData.observation}
              onChange={(e) => handleChange("observation", e.target.value)}
              placeholder="Informações adicionais sobre o show..."
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
