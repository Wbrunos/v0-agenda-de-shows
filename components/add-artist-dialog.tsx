"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Music, Palette } from "lucide-react"

interface AddArtistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddArtist: (artistData: { name: string; genre: string; color: string }) => void
}

const genres = [
  "Rock",
  "Pop",
  "Electronic",
  "Hip Hop",
  "R&B",
  "Jazz",
  "Blues",
  "Country",
  "Reggae",
  "Classical",
  "Folk",
  "Punk",
  "Metal",
  "Funk",
  "Disco",
  "House",
  "Techno",
  "Trance",
  "Dubstep",
  "Synthwave",
  "Retrowave",
  "Synthpop",
  "EDM",
  "Indie",
  "Alternative",
  "Grunge",
  "Ambient",
]

const colors = [
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#EF4444", // Red
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#F97316", // Orange
  "#6366F1", // Indigo
  "#8B5A2B", // Brown
  "#6B7280", // Gray
  "#DC2626", // Red-600
  "#7C3AED", // Violet
  "#059669", // Emerald
  "#D97706", // Amber
]

export function AddArtistDialog({ open, onOpenChange, onAddArtist }: AddArtistDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    color: colors[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.genre) {
      return
    }

    onAddArtist(formData)
    onOpenChange(false)

    // Reset form
    setFormData({
      name: "",
      genre: "",
      color: colors[0],
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Music className="h-6 w-6 text-blue-600" />
            Adicionar Novo Artista
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
              Nome do Artista *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border-gray-300 focus:border-blue-500"
              placeholder="Ex: The Midnight"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre" className="text-gray-700">
              Gênero Musical *
            </Label>
            <Select value={formData.genre} onValueChange={(value) => handleChange("genre", value)}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Selecione um gênero" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 max-h-[200px]">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="hover:bg-blue-50">
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Cor do Artista
            </Label>
            <div className="grid grid-cols-8 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${
                    formData.color === color ? "border-gray-800 ring-2 ring-gray-400" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleChange("color", color)}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500">A cor será usada para identificar o artista no calendário</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Prévia</h4>
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: formData.color }}
              >
                {formData.name.charAt(0) || "A"}
              </div>
              <div>
                <p className="font-medium text-gray-900">{formData.name || "Nome do Artista"}</p>
                <p className="text-sm text-gray-600">{formData.genre || "Gênero"}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              disabled={!formData.name.trim() || !formData.genre}
            >
              Adicionar Artista
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
