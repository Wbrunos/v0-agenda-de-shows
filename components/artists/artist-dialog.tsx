"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Music, Edit, Trash2, Palette } from "lucide-react"

interface Artist {
  id: number
  name: string
  genre: string
  color: string
}

interface ArtistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  artists: Artist[]
  onAddArtist: (artist: Omit<Artist, "id">) => void
  onUpdateArtist: (artist: Artist) => void
}

export function ArtistDialog({ open, onOpenChange, artists, onAddArtist, onUpdateArtist }: ArtistDialogProps) {
  const [newArtist, setNewArtist] = useState({
    name: "",
    genre: "",
    color: "#3B82F6",
  })
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null)

  const genres = [
    "Synthwave",
    "Electronic",
    "Retrowave",
    "EDM",
    "Synthpop",
    "Darkwave",
    "Pop",
    "Rock",
    "Jazz",
    "Classical",
    "Hip Hop",
    "R&B",
    "Country",
    "Folk",
    "Punk",
    "Metal",
    "Indie",
    "Alternative",
    "Funk",
    "Soul",
    "Blues",
    "Reggae",
  ]

  const predefinedColors = [
    "#3B82F6",
    "#8B5CF6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#EC4899",
    "#6366F1",
    "#14B8A6",
    "#F97316",
    "#84CC16",
    "#06B6D4",
    "#8B5A2B",
    "#DC2626",
    "#7C3AED",
    "#059669",
    "#D97706",
    "#BE185D",
    "#4338CA",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingArtist) {
      onUpdateArtist({ ...editingArtist, ...newArtist })
      setEditingArtist(null)
    } else {
      onAddArtist(newArtist)
    }
    setNewArtist({ name: "", genre: "", color: "#3B82F6" })
  }

  const handleEdit = (artist: Artist) => {
    setEditingArtist(artist)
    setNewArtist({
      name: artist.name,
      genre: artist.genre,
      color: artist.color,
    })
  }

  const handleCancel = () => {
    setEditingArtist(null)
    setNewArtist({ name: "", genre: "", color: "#3B82F6" })
  }

  const handleColorSelect = (color: string) => {
    setNewArtist((prev) => ({ ...prev, color }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Music className="h-6 w-6 text-blue-600" />
            Artist Management
          </DialogTitle>
          <DialogDescription>
            Add new artists or manage existing ones. Each artist gets a unique color for calendar events.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="add" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="add"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              {editingArtist ? "Edit Artist" : "Add Artist"}
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Manage Artists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-4">
            <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingArtist ? "Edit Artist" : "Add New Artist"}
                </CardTitle>
                <CardDescription>
                  {editingArtist ? "Update artist information" : "Create a new artist profile"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Artist Name
                      </Label>
                      <Input
                        id="name"
                        value={newArtist.name}
                        onChange={(e) => setNewArtist((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter artist name"
                        className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genre" className="text-sm font-medium">
                        Genre
                      </Label>
                      <Select
                        value={newArtist.genre}
                        onValueChange={(value) => setNewArtist((prev) => ({ ...prev, genre: value }))}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-blue-400">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Color Theme
                    </Label>
                    <div className="grid grid-cols-6 sm:grid-cols-9 gap-3">
                      {predefinedColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                            newArtist.color === color
                              ? "border-gray-900 shadow-lg ring-2 ring-gray-300"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelect(color)}
                          title={color}
                        />
                      ))}
                    </div>
                    <div className="flex items-center space-x-3 pt-2">
                      <Label htmlFor="custom-color" className="text-sm">
                        Custom Color:
                      </Label>
                      <input
                        id="custom-color"
                        type="color"
                        value={newArtist.color}
                        onChange={(e) => handleColorSelect(e.target.value)}
                        className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 font-mono">{newArtist.color}</span>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Preview</Label>
                    <div className="p-4 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                          style={{ backgroundColor: newArtist.color }}
                        >
                          <Music className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{newArtist.name || "Artist Name"}</div>
                          <div className="text-sm text-gray-600">{newArtist.genre || "Genre"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      {editingArtist ? "Update Artist" : "Add Artist"}
                    </Button>
                    {editingArtist && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="border-gray-300 hover:bg-gray-50 bg-transparent"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle>Registered Artists</CardTitle>
                <CardDescription>Manage your artist roster ({artists.length} artists)</CardDescription>
              </CardHeader>
              <CardContent>
                {artists.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No artists registered yet</p>
                    <p className="text-sm">Add your first artist to get started</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {artists.map((artist) => (
                      <div
                        key={artist.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                              style={{ backgroundColor: artist.color }}
                            >
                              <Music className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{artist.name}</h3>
                              <p className="text-sm text-gray-600">{artist.genre}</p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(artist)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div
                          className="w-full h-2 rounded-full mt-3 opacity-30"
                          style={{ backgroundColor: artist.color }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
