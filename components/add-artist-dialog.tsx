"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddArtistDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function AddArtistDialog({ isOpen, onClose }: AddArtistDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    phone: "",
    email: "",
    city: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar o artista
    console.log("Novo artista:", formData)
    onClose()
    // Reset form
    setFormData({
      name: "",
      genre: "",
      phone: "",
      email: "",
      city: "",
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
          <DialogTitle className="text-xl">Novo Artista</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Nome do Artista
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Nome completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre" className="text-slate-300">
              Gênero Musical
            </Label>
            <Select onValueChange={(value) => handleChange("genre", value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600">
                <SelectValue placeholder="Selecione o gênero" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="mpb">MPB</SelectItem>
                <SelectItem value="jazz">Jazz</SelectItem>
                <SelectItem value="sertanejo">Sertanejo</SelectItem>
                <SelectItem value="eletronica">Eletrônica</SelectItem>
                <SelectItem value="reggae">Reggae</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-300">
              Telefone
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="artista@email.com"
              required
            />
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
              placeholder="Cidade do artista"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Informações sobre o artista..."
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
              Salvar Artista
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
