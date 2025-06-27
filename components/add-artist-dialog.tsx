"use client"

import type React from "react"

import { useState } from "react"
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

interface AddArtistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddArtist: (artist: { name: string; genre: string; country: string }) => void
}

export function AddArtistDialog({ open, onOpenChange, onAddArtist }: AddArtistDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    country: "",
  })

  const genres = [
    "Rock",
    "Pop",
    "Hip Hop",
    "R&B",
    "Country",
    "Jazz",
    "Blues",
    "Reggae",
    "Electronic",
    "Classical",
    "Folk",
    "Punk",
    "Metal",
    "Indie",
    "Alternative",
    "Funk",
    "Soul",
    "Gospel",
    "MPB",
    "Samba",
    "Bossa Nova",
    "Forró",
    "Sertanejo",
  ]

  const countries = [
    "Brasil",
    "Estados Unidos",
    "Reino Unido",
    "Canadá",
    "França",
    "Alemanha",
    "Espanha",
    "Itália",
    "Argentina",
    "México",
    "Colômbia",
    "Chile",
    "Peru",
    "Uruguai",
    "Portugal",
    "Austrália",
    "Japão",
    "Coreia do Sul",
    "Suécia",
    "Noruega",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddArtist(formData)
    setFormData({ name: "", genre: "", country: "" })
    onOpenChange(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Adicionar Novo Artista</DialogTitle>
          <DialogDescription className="text-slate-400">
            Preencha as informações do artista para adicioná-lo ao sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">
              Nome do Artista
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Ex: Coldplay"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre" className="text-slate-200">
              Gênero Musical
            </Label>
            <Select value={formData.genre} onValueChange={(value) => handleChange("genre", value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Selecione um gênero" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="text-white">
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-slate-200">
              País de Origem
            </Label>
            <Select value={formData.country} onValueChange={(value) => handleChange("country", value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Selecione um país" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {countries.map((country) => (
                  <SelectItem key={country} value={country} className="text-white">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              Adicionar Artista
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
