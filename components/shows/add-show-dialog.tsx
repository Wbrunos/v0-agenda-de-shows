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
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Music } from "lucide-react"

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
  onAddShow: (show: any) => void
}

export function AddShowDialog({ open, onOpenChange, artists, onAddShow }: AddShowDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    date: "",
    time: "",
    venue: "",
    city: "",
    status: "pending",
    price: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddShow(formData)
    onOpenChange(false)
    setFormData({
      title: "",
      artist: "",
      date: "",
      time: "",
      venue: "",
      city: "",
      status: "pending",
      price: "",
      description: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const selectedArtist = artists.find((a) => a.name === formData.artist)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Music className="h-6 w-6 text-blue-600" />
            Schedule New Show
          </DialogTitle>
          <DialogDescription>
            Add a new performance to your calendar. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Show Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g., Synthwave Night"
                className="border-gray-200 focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist" className="text-sm font-medium">
                Artist *
              </Label>
              <Select value={formData.artist} onValueChange={(value) => handleChange("artist", value)}>
                <SelectTrigger className="border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Select artist" />
                </SelectTrigger>
                <SelectContent>
                  {artists.map((artist) => (
                    <SelectItem key={artist.id} value={artist.name}>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: artist.color }}></div>
                        <span>{artist.name}</span>
                        <span className="text-xs text-gray-500">({artist.genre})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="border-gray-200 focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="border-gray-200 focus:border-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="venue" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Venue *
              </Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => handleChange("venue", e.target.value)}
                placeholder="e.g., Blue Note"
                className="border-gray-200 focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                City *
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="e.g., New York"
                className="border-gray-200 focus:border-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger className="border-gray-200 focus:border-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">
                    <span className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span>Pending</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="confirmed">
                    <span className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Confirmed</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="cancelled">
                    <span className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span>Cancelled</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Ticket Price
              </Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="e.g., $75"
                className="border-gray-200 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Additional details about the show..."
              className="border-gray-200 focus:border-blue-400 min-h-[80px]"
              rows={3}
            />
          </div>

          {/* Preview */}
          {selectedArtist && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Preview</Label>
              <div className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                <div
                  className="inline-block px-3 py-2 rounded-md text-white text-sm font-medium"
                  style={{ backgroundColor: selectedArtist.color }}
                >
                  {formData.artist}
                  {formData.time && <span className="block text-xs opacity-90">{formData.time}</span>}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Schedule Show
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
