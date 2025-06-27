"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Show {
  id: number
  title: string
  artist: string
  artistId: number
  date: string
  time: string
  venue: string
  city: string
  status: string
  price?: string
  description?: string
}

interface Artist {
  id: number
  name: string
}

interface EditShowDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  show: Show | null
  artists: Artist[]
  onUpdateShow: (show: Show) => void
}

export function EditShowDialog({ open, onOpenChange, show, artists, onUpdateShow }: EditShowDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    artistId: "",
    date: "",
    time: "",
    venue: "",
    city: "",
    price: "",
    description: "",
    status: "pendente",
  })

  useEffect(() => {
    if (show) {
      setFormData({
        title: show.title,
        artistId: show.artistId.toString(),
        date: show.date,
        time: show.time,
        venue: show.venue,
        city: show.city,
        price: show.price || "",
        description: show.description || "",
        status: show.status,
      })
    }
  }, [show])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!show) return

    const artist = artists.find((a) => a.id.toString() === formData.artistId)

    onUpdateShow({
      ...show,
      ...formData,
      artist: artist?.name || "",
      artistId: Number.parseInt(formData.artistId),
    })

    onOpenChange(false)
  }

  if (!show) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Show</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título do Show</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="artist">Artista</Label>
              <Select
                value={formData.artistId}
                onValueChange={(value) => setFormData({ ...formData, artistId: value })}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Selecione um artista" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {artists.map((artist) => (
                    <SelectItem key={artist.id} value={artist.id.toString()}>
                      {artist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Horário</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="venue">Local</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-slate-700 border-slate-600"
                placeholder="R$ 100"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-700 border-slate-600"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
